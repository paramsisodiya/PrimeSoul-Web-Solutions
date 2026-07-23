'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import {
  FileText, Download, Plus, Trash2, Eye, Save, IndianRupee,
  Check, Clock, AlertCircle, Search, Edit3, ShieldCheck, ToggleLeft, ToggleRight
} from 'lucide-react'

interface LineItem {
  id: number
  description: string
  quantity: number
  rate: number
}

interface SavedInvoice {
  id: string
  clientName: string
  clientEmail: string
  projectName: string
  invoiceNumber: string
  date: string
  dueDate: string
  items: LineItem[]
  subtotal: number
  discount: number
  discountType: 'flat' | 'percent'
  enableGst: boolean
  gstRate: number
  gst: number
  total: number
  notes: string
  paymentMethod: string
  paymentDetails: string
  status: 'paid' | 'unpaid' | 'overdue'
  createdAt: unknown
}

export default function InvoiceGeneratorPage() {
  // Helper to format Date string (YYYY-MM-DD)
  const getTodayStr = () => new Date().toISOString().split('T')[0]
  const getOffsetDateStr = (days: number) => {
    const d = new Date()
    d.setDate(d.getDate() + days)
    return d.toISOString().split('T')[0]
  }

  // Invoice Form State
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [projectName, setProjectName] = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState(`PS-${Date.now().toString().slice(-6)}`)
  const [date, setDate] = useState(getTodayStr())
  const [dueDate, setDueDate] = useState(getOffsetDateStr(7)) // default +7 days
  const [status, setStatus] = useState<'paid' | 'unpaid' | 'overdue'>('unpaid')

  // Tax & Discount State
  const [enableGst, setEnableGst] = useState(false) // Toggle GST ON/OFF
  const [gstRate, setGstRate] = useState(18)
  const [discountType, setDiscountType] = useState<'flat' | 'percent'>('flat')
  const [discountValue, setDiscountValue] = useState(0)

  // Payment Details & Notes
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer / UPI')
  const [paymentDetails, setPaymentDetails] = useState('Bank: HDFC Bank | A/C: 502000xxxxxx | IFSC: HDFC000xxxx | UPI ID: 8770404559@upi')
  const [notes, setNotes] = useState('Thank you for choosing PrimeSoul Web Solutions! Payment is due within the stipulated time frame.')

  // Items State
  const [items, setItems] = useState<LineItem[]>([
    { id: 1, description: 'Website Design & Development', quantity: 1, rate: 7999 },
  ])

  // UI State
  const [showPreview, setShowPreview] = useState(false)
  const [savedInvoices, setSavedInvoices] = useState<SavedInvoice[]>([])
  const [viewMode, setViewMode] = useState<'create' | 'list'>('create')
  const [savingInvoice, setSavingInvoice] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Filtering & Search for Saved Invoices
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'unpaid' | 'overdue'>('all')

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    try {
      const snap = await getDocs(query(collection(db, 'invoices'), orderBy('createdAt', 'desc')))
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as SavedInvoice))
      setSavedInvoices(data)
    } catch (err) {
      console.error('Error fetching invoices:', err)
    }
  }

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.rate) || 0), 0)
  
  const discountAmount = useMemo(() => {
    if (!discountValue || discountValue <= 0) return 0
    if (discountType === 'percent') {
      return Math.round((subtotal * Math.min(discountValue, 100)) / 100)
    }
    return Math.min(discountValue, subtotal)
  }, [subtotal, discountType, discountValue])

  const taxableAmount = Math.max(0, subtotal - discountAmount)
  const gstAmount = enableGst ? Math.round((taxableAmount * (Number(gstRate) || 0)) / 100) : 0
  const grandTotal = taxableAmount + gstAmount

  // Quick preset for Due Date
  const applyDueDatePreset = (days: number) => {
    if (days === 0) {
      setDueDate(date)
    } else {
      setDueDate(getOffsetDateStr(days))
    }
  }

  // Line Item Handlers
  const addItem = () => {
    setItems(prev => [...prev, { id: Date.now(), description: '', quantity: 1, rate: 0 }])
  }

  const removeItem = (id: number) => {
    if (items.length <= 1) return
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const updateItem = (id: number, field: keyof LineItem, value: string | number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  // Reset form
  const resetForm = () => {
    setClientName('')
    setClientEmail('')
    setProjectName('')
    setInvoiceNumber(`PS-${Date.now().toString().slice(-6)}`)
    setDate(getTodayStr())
    setDueDate(getOffsetDateStr(7))
    setStatus('unpaid')
    setEnableGst(false)
    setGstRate(18)
    setDiscountType('flat')
    setDiscountValue(0)
    setItems([{ id: 1, description: 'Website Design & Development', quantity: 1, rate: 7999 }])
    setEditingId(null)
    setNotes('Thank you for choosing PrimeSoul Web Solutions! Payment is due within the stipulated time frame.')
  }

  // Save / Update Invoice
  const saveInvoice = async () => {
    if (!clientName.trim()) {
      alert('Please enter a client name.')
      return
    }
    setSavingInvoice(true)
    try {
      const invoiceData = {
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        projectName: projectName.trim(),
        invoiceNumber,
        date,
        dueDate,
        status,
        items: items.map(({ description, quantity, rate }) => ({
          description: description || 'Service',
          quantity: Number(quantity) || 1,
          rate: Number(rate) || 0
        })),
        subtotal,
        discount: discountAmount,
        discountType,
        discountValue,
        enableGst,
        gstRate,
        gst: gstAmount,
        total: grandTotal,
        notes,
        paymentMethod,
        paymentDetails,
        updatedAt: serverTimestamp(),
      }

      if (editingId) {
        await updateDoc(doc(db, 'invoices', editingId), invoiceData)
        alert('Invoice updated successfully!')
      } else {
        await addDoc(collection(db, 'invoices'), {
          ...invoiceData,
          createdAt: serverTimestamp(),
        })
        alert('Invoice created & saved successfully!')
      }

      await fetchInvoices()
      resetForm()
      setViewMode('list')
    } catch (err) {
      console.error('Error saving invoice:', err)
      alert('Failed to save invoice.')
    } finally {
      setSavingInvoice(false)
    }
  }

  // Status Change for Past Invoices
  const updateSavedInvoiceStatus = async (invoiceId: string, newStatus: 'paid' | 'unpaid' | 'overdue') => {
    try {
      await updateDoc(doc(db, 'invoices', invoiceId), { status: newStatus })
      setSavedInvoices(prev => prev.map(inv => inv.id === invoiceId ? { ...inv, status: newStatus } : inv))
    } catch (err) {
      console.error('Error updating invoice status:', err)
    }
  }

  // Delete Past Invoice
  const deleteInvoice = async (invoiceId: string) => {
    if (!confirm('Are you sure you want to delete this invoice?')) return
    try {
      await deleteDoc(doc(db, 'invoices', invoiceId))
      setSavedInvoices(prev => prev.filter(inv => inv.id !== invoiceId))
    } catch (err) {
      console.error('Error deleting invoice:', err)
    }
  }

  // Load Past Invoice into Form for Editing
  const loadInvoiceForEditing = (inv: SavedInvoice) => {
    setEditingId(inv.id)
    setClientName(inv.clientName || '')
    setClientEmail(inv.clientEmail || '')
    setProjectName(inv.projectName || '')
    setInvoiceNumber(inv.invoiceNumber || '')
    setDate(inv.date || getTodayStr())
    setDueDate(inv.dueDate || getOffsetDateStr(7))
    setStatus(inv.status || 'unpaid')
    setEnableGst(inv.enableGst || false)
    setGstRate(inv.gstRate || 18)
    setDiscountValue(inv.discount || 0)
    setItems(inv.items && inv.items.length > 0 ? inv.items.map((item, idx) => ({ description: item.description || '', quantity: item.quantity || 1, rate: item.rate || 0, id: idx + 1 })) : [{ id: 1, description: '', quantity: 1, rate: 0 }])
    setNotes(inv.notes || '')
    setPaymentMethod(inv.paymentMethod || 'Bank Transfer / UPI')
    setPaymentDetails(inv.paymentDetails || '')
    setViewMode('create')
  }

  // Print PDF generator
  const generatePDF = (customInvoice?: SavedInvoice) => {
    const invClientName = customInvoice ? customInvoice.clientName : clientName
    const invClientEmail = customInvoice ? customInvoice.clientEmail : clientEmail
    const invProjectName = customInvoice ? customInvoice.projectName : projectName
    const invNumber = customInvoice ? customInvoice.invoiceNumber : invoiceNumber
    const invDate = customInvoice ? customInvoice.date : date
    const invDueDate = customInvoice ? customInvoice.dueDate : dueDate
    const invStatus = customInvoice ? customInvoice.status : status
    const invItems = customInvoice ? customInvoice.items : items
    const invSubtotal = customInvoice ? customInvoice.subtotal : subtotal
    const invDiscount = customInvoice ? customInvoice.discount : discountAmount
    const invEnableGst = customInvoice ? customInvoice.enableGst : enableGst
    const invGstRate = customInvoice ? (customInvoice.gstRate || 18) : gstRate
    const invGst = customInvoice ? customInvoice.gst : gstAmount
    const invTotal = customInvoice ? customInvoice.total : grandTotal
    const invNotes = customInvoice ? customInvoice.notes : notes
    const invPaymentMethod = customInvoice ? customInvoice.paymentMethod : paymentMethod
    const invPaymentDetails = customInvoice ? customInvoice.paymentDetails : paymentDetails

    const statusBadgeColor = invStatus === 'paid' ? '#10B981' : invStatus === 'overdue' ? '#EF4444' : '#F59E0B'
    const statusText = invStatus === 'paid' ? 'PAID' : invStatus === 'overdue' ? 'OVERDUE' : 'PENDING'

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Invoice ${invNumber}</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0E0E2C;background:#fff;padding:40px;line-height:1.5}
    .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:32px;padding-bottom:20px;border-bottom:2px solid #7B2FF2}
    .logo{font-size:26px;font-weight:800;color:#0E0E2C;letter-spacing:-0.5px}
    .logo span{color:#7B2FF2}
    .logo-sub{font-size:11px;color:#7A7A9E;margin-top:2px;text-transform:uppercase;letter-spacing:1px}
    .invoice-title{text-align:right}
    .invoice-title h2{font-size:28px;color:#7B2FF2;font-weight:800;letter-spacing:1px}
    .invoice-title p{font-size:13px;color:#7A7A9E;margin-top:2px}
    .status-badge{display:inline-block;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:1px;color:#fff;background:${statusBadgeColor};margin-top:6px}
    .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:32px;background:#F8F6FF;padding:20px;border-radius:12px}
    .info-box h4{font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#7B2FF2;margin-bottom:6px;font-weight:700}
    .info-box p{font-size:13px;color:#4A4A6A;margin-bottom:2px}
    .info-box .value{font-weight:700;color:#0E0E2C}
    table{width:100%;border-collapse:collapse;margin-bottom:28px}
    thead{background:#7B2FF2}
    th{text-align:left;padding:10px 14px;font-size:11px;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:1px}
    td{padding:12px 14px;font-size:13px;border-bottom:1px solid #E8E5F5;color:#0E0E2C}
    .text-right{text-align:right}
    .summary-wrap{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:32px;gap:20px}
    .payment-info{flex:1;background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;padding:16px;font-size:12px}
    .payment-info h4{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#374151;margin-bottom:6px;font-weight:700}
    .payment-info p{color:#4B5563;line-height:1.6}
    .totals{width:260px}
    .total-row{display:flex;justify-content:space-between;padding:6px 0;font-size:13px;color:#4A4A6A}
    .total-row.grand{font-size:18px;font-weight:800;color:#0E0E2C;border-top:2px solid #7B2FF2;padding-top:10px;margin-top:6px}
    .notes{margin-bottom:32px;padding:16px;background:#F8F6FF;border-left:4px solid #7B2FF2;border-radius:0 8px 8px 0;font-size:12px;color:#4A4A6A;line-height:1.5}
    .notes strong{color:#7B2FF2;display:block;margin-bottom:4px}
    .footer{text-align:center;font-size:11px;color:#9CA3AF;padding-top:20px;border-top:1px solid #E8E5F5}
    @media print{body{padding:20px}button{display:none!important}}
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">Prime<span>Soul</span></div>
      <div class="logo-sub">Web Solutions</div>
    </div>
    <div class="invoice-title">
      <h2>INVOICE</h2>
      <p>#${invNumber}</p>
      <div class="status-badge">${statusText}</div>
    </div>
  </div>

  <div class="info-grid">
    <div class="info-box">
      <h4>Billed To</h4>
      <p class="value">${invClientName || 'Client Name'}</p>
      ${invClientEmail ? `<p>${invClientEmail}</p>` : ''}
      ${invProjectName ? `<p>Project: <span class="value">${invProjectName}</span></p>` : ''}
    </div>
    <div class="info-box text-right">
      <h4>Invoice Details</h4>
      <p>Invoice Date: <span class="value">${invDate ? new Date(invDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}</span></p>
      <p>Due Date: <span class="value">${invDueDate ? new Date(invDueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'On Receipt'}</span></p>
      <p>Payment Method: <span class="value">${invPaymentMethod || 'Bank Transfer'}</span></p>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th class="text-right">Qty</th>
        <th class="text-right">Rate</th>
        <th class="text-right">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${invItems.map(item => `
        <tr>
          <td>${item.description || '—'}</td>
          <td class="text-right">${item.quantity}</td>
          <td class="text-right">₹${Number(item.rate).toLocaleString('en-IN')}</td>
          <td class="text-right">₹${(Number(item.quantity) * Number(item.rate)).toLocaleString('en-IN')}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="summary-wrap">
    <div class="payment-info">
      <h4>Payment Instructions</h4>
      <p>${invPaymentDetails || 'Contact PrimeSoul for direct bank or UPI payment details.'}</p>
    </div>
    <div class="totals">
      <div class="total-row"><span>Subtotal</span><span>₹${invSubtotal.toLocaleString('en-IN')}</span></div>
      ${invDiscount > 0 ? `<div class="total-row" style="color:#EF4444"><span>Discount</span><span>- ₹${invDiscount.toLocaleString('en-IN')}</span></div>` : ''}
      ${invEnableGst ? `<div class="total-row"><span>GST (${invGstRate}%)</span><span>₹${invGst.toLocaleString('en-IN')}</span></div>` : ''}
      <div class="total-row grand"><span>Total Due</span><span>₹${invTotal.toLocaleString('en-IN')}</span></div>
    </div>
  </div>

  ${invNotes ? `<div class="notes"><strong>Terms & Notes:</strong> ${invNotes}</div>` : ''}

  <div class="footer">
    <p>PrimeSoul Web Solutions · Rajgarh, MP, India · primesoulwebsolutions@gmail.com · +91 8770 404 559</p>
  </div>

  <script>window.onload=()=>window.print()</script>
</body>
</html>`

    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
  }

  // Filtered Past Invoices list
  const filteredInvoices = useMemo(() => {
    return savedInvoices.filter(inv => {
      const matchesSearch =
        (inv.clientName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inv.invoiceNumber || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inv.projectName || '').toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'all' ? true : inv.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [savedInvoices, searchQuery, statusFilter])

  // Statistics Summary
  const stats = useMemo(() => {
    const totalBilled = savedInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0)
    const totalPaid = savedInvoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + (inv.total || 0), 0)
    const totalPending = savedInvoices.filter(i => i.status === 'unpaid' || i.status === 'overdue').reduce((sum, inv) => sum + (inv.total || 0), 0)
    return { totalBilled, totalPaid, totalPending }
  }, [savedInvoices])

  // Past Invoices List View
  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-white text-2xl font-bold">Past Invoices</h1>
            <p className="text-[#4A4A6A] text-sm mt-1">Manage and track all issued client invoices</p>
          </div>
          <button
            onClick={() => { resetForm(); setViewMode('create'); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#7B2FF2] to-[#8B5CF6] text-white hover:opacity-90 transition-all shadow-lg"
          >
            <Plus size={16} /> Create New Invoice
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-5">
            <p className="text-[#4A4A6A] text-xs font-semibold uppercase tracking-wider mb-1">Total Billed</p>
            <p className="text-white text-2xl font-bold">₹{stats.totalBilled.toLocaleString('en-IN')}</p>
            <p className="text-[#7A7A9E] text-xs mt-1">{savedInvoices.length} invoices total</p>
          </div>
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-5">
            <p className="text-[#4A4A6A] text-xs font-semibold uppercase tracking-wider mb-1">Total Collected (Paid)</p>
            <p className="text-green-400 text-2xl font-bold">₹{stats.totalPaid.toLocaleString('en-IN')}</p>
            <p className="text-[#7A7A9E] text-xs mt-1">{savedInvoices.filter(i => i.status === 'paid').length} paid invoices</p>
          </div>
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-5">
            <p className="text-[#4A4A6A] text-xs font-semibold uppercase tracking-wider mb-1">Pending / Unpaid</p>
            <p className="text-amber-400 text-2xl font-bold">₹{stats.totalPending.toLocaleString('en-IN')}</p>
            <p className="text-[#7A7A9E] text-xs mt-1">{savedInvoices.filter(i => i.status !== 'paid').length} pending/overdue</p>
          </div>
        </div>

        {/* Search & Status Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#161640] border border-white/5 rounded-2xl p-4">
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by client, invoice #..."
              className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2]"
            />
          </div>

          <div className="flex gap-1.5 w-full sm:w-auto">
            {(['all', 'unpaid', 'paid', 'overdue'] as const).map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  statusFilter === st
                    ? 'bg-[#7B2FF2] text-white'
                    : 'bg-[#0E0E2C] text-[#7A7A9E] hover:text-white border border-white/5'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Invoice List Table */}
        {filteredInvoices.length === 0 ? (
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-12 text-center">
            <FileText size={40} className="text-[#4A4A6A] mx-auto mb-4" />
            <p className="text-[#7A7A9E] mb-2">No invoices match your filter</p>
            <p className="text-[#4A4A6A] text-sm">Create a new invoice or change search terms</p>
          </div>
        ) : (
          <div className="bg-[#161640] border border-white/5 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-[#0E0E2C]/50 text-[#4A4A6A] font-semibold text-xs uppercase tracking-wider">
                    <th className="px-5 py-3.5 text-left">Invoice #</th>
                    <th className="px-5 py-3.5 text-left">Client & Project</th>
                    <th className="px-5 py-3.5 text-left">Date / Due</th>
                    <th className="px-5 py-3.5 text-right">Amount</th>
                    <th className="px-5 py-3.5 text-center">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredInvoices.map(inv => (
                    <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4 text-[#7B2FF2] font-mono font-bold">{inv.invoiceNumber}</td>
                      <td className="px-5 py-4">
                        <p className="text-white font-semibold">{inv.clientName}</p>
                        <p className="text-[#4A4A6A] text-xs">{inv.projectName || inv.clientEmail || '—'}</p>
                      </td>
                      <td className="px-5 py-4 text-[#7A7A9E] text-xs">
                        <p>Issued: {inv.date || '—'}</p>
                        <p className="text-[#4A4A6A]">Due: {inv.dueDate || 'On Receipt'}</p>
                      </td>
                      <td className="px-5 py-4 text-right text-white font-bold">
                        ₹{(inv.total || 0).toLocaleString('en-IN')}
                        {inv.enableGst && <span className="block text-[10px] text-[#7A7A9E] font-normal">+GST</span>}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <div className="inline-flex items-center gap-1.5">
                          <select
                            value={inv.status || 'unpaid'}
                            onChange={e => updateSavedInvoiceStatus(inv.id, e.target.value as 'paid' | 'unpaid' | 'overdue')}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer outline-none transition-all ${
                              inv.status === 'paid'
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : inv.status === 'overdue'
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            <option value="unpaid" className="bg-[#161640] text-amber-400">⏳ Pending</option>
                            <option value="paid" className="bg-[#161640] text-green-400">✓ Paid</option>
                            <option value="overdue" className="bg-[#161640] text-red-400">⚠ Overdue</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => loadInvoiceForEditing(inv)}
                            title="Edit Invoice"
                            className="p-2 rounded-lg bg-white/5 text-[#7A7A9E] hover:text-white hover:bg-white/10 transition-all"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => generatePDF(inv)}
                            title="Download PDF"
                            className="p-2 rounded-lg bg-[#7B2FF2]/20 text-[#7B2FF2] hover:bg-[#7B2FF2] hover:text-white transition-all"
                          >
                            <Download size={15} />
                          </button>
                          <button
                            onClick={() => deleteInvoice(inv.id)}
                            title="Delete Invoice"
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Create / Edit Invoice View
  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold">
            {editingId ? 'Edit Invoice' : 'Create New Invoice'}
          </h1>
          <p className="text-[#4A4A6A] text-sm mt-1">Configure client details, items, tax, and status</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setViewMode('list')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[#161640] text-[#7A7A9E] hover:text-white border border-white/5 transition-all"
          >
            <FileText size={16} /> Past Invoices ({savedInvoices.length})
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[#161640] text-[#7A7A9E] hover:text-white border border-white/5 transition-all"
          >
            <Eye size={16} /> {showPreview ? 'Form View' : 'Preview PDF'}
          </button>
          <button
            onClick={saveInvoice}
            disabled={savingInvoice}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition-all disabled:opacity-50"
          >
            <Save size={16} /> {savingInvoice ? 'Saving...' : editingId ? 'Update' : 'Save Invoice'}
          </button>
          <button
            onClick={() => generatePDF()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#7B2FF2] to-[#8B5CF6] text-white hover:opacity-90 transition-all shadow-lg"
          >
            <Download size={16} /> Print / Download PDF
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form Controls Column */}
        <div className="space-y-4">
          {/* Status & Issue Date Row */}
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-5 space-y-4">
            <h3 className="text-white font-semibold text-sm flex items-center gap-2">
              <Clock size={16} className="text-[#7B2FF2]" /> Invoice Status & Dates
            </h3>

            {/* Status Choice */}
            <div>
              <label className="text-xs text-[#7A7A9E] font-medium mb-1.5 block">Invoice Payment Status</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus('unpaid')}
                  className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                    status === 'unpaid'
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                      : 'bg-[#0E0E2C] text-[#7A7A9E] border-white/10 hover:text-white'
                  }`}
                >
                  <Clock size={14} /> Pending
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('paid')}
                  className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                    status === 'paid'
                      ? 'bg-green-500/20 text-green-400 border-green-500/50'
                      : 'bg-[#0E0E2C] text-[#7A7A9E] border-white/10 hover:text-white'
                  }`}
                >
                  <Check size={14} /> Paid
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('overdue')}
                  className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                    status === 'overdue'
                      ? 'bg-red-500/20 text-red-400 border-red-500/50'
                      : 'bg-[#0E0E2C] text-[#7A7A9E] border-white/10 hover:text-white'
                  }`}
                >
                  <AlertCircle size={14} /> Overdue
                </button>
              </div>
            </div>

            {/* Dates & Due Presets */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#7A7A9E] font-medium mb-1 block">Issue Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7B2FF2]"
                />
              </div>
              <div>
                <label className="text-xs text-[#7A7A9E] font-medium mb-1 block">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7B2FF2]"
                />
              </div>
            </div>

            {/* Quick Due Date Presets */}
            <div>
              <label className="text-[11px] text-[#4A4A6A] font-medium mb-1 block">Quick Due Date Presets:</label>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => applyDueDatePreset(0)}
                  className="px-2.5 py-1 rounded-lg bg-[#0E0E2C] text-[#7A7A9E] text-xs hover:text-white border border-white/10"
                >
                  On Receipt
                </button>
                <button
                  type="button"
                  onClick={() => applyDueDatePreset(7)}
                  className="px-2.5 py-1 rounded-lg bg-[#0E0E2C] text-[#7A7A9E] text-xs hover:text-white border border-white/10"
                >
                  +7 Days
                </button>
                <button
                  type="button"
                  onClick={() => applyDueDatePreset(15)}
                  className="px-2.5 py-1 rounded-lg bg-[#0E0E2C] text-[#7A7A9E] text-xs hover:text-white border border-white/10"
                >
                  +15 Days
                </button>
                <button
                  type="button"
                  onClick={() => applyDueDatePreset(30)}
                  className="px-2.5 py-1 rounded-lg bg-[#0E0E2C] text-[#7A7A9E] text-xs hover:text-white border border-white/10"
                >
                  +30 Days
                </button>
              </div>
            </div>
          </div>

          {/* Client Details */}
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-5 space-y-3">
            <h3 className="text-white font-semibold text-sm flex items-center gap-2">
              <FileText size={16} className="text-[#7B2FF2]" /> Client Details
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <input
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                placeholder="Client Name *"
                className="bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2]"
              />
              <input
                value={clientEmail}
                onChange={e => setClientEmail(e.target.value)}
                placeholder="Client Email (Optional)"
                className="bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
                placeholder="Project Name / Reference"
                className="bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2]"
              />
              <input
                value={invoiceNumber}
                onChange={e => setInvoiceNumber(e.target.value)}
                placeholder="Invoice #"
                className="bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2]"
              />
            </div>
          </div>

          {/* Line Items */}
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-sm">Line Items & Services</h3>
              <button
                onClick={addItem}
                className="flex items-center gap-1.5 text-[#7B2FF2] text-xs font-semibold hover:underline"
              >
                <Plus size={14} /> Add Line Item
              </button>
            </div>

            {items.map(item => (
              <div key={item.id} className="flex gap-2 items-center">
                <input
                  value={item.description}
                  onChange={e => updateItem(item.id, 'description', e.target.value)}
                  placeholder="Service description"
                  className="flex-1 bg-[#0E0E2C] border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2]"
                />
                <input
                  type="number"
                  value={item.quantity}
                  onChange={e => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                  placeholder="Qty"
                  className="w-16 bg-[#0E0E2C] border border-white/10 rounded-xl px-2 py-2 text-white text-sm text-center focus:outline-none focus:border-[#7B2FF2]"
                />
                <input
                  type="number"
                  value={item.rate}
                  onChange={e => updateItem(item.id, 'rate', parseInt(e.target.value) || 0)}
                  placeholder="Rate (₹)"
                  className="w-24 bg-[#0E0E2C] border border-white/10 rounded-xl px-3 py-2 text-white text-sm text-right focus:outline-none focus:border-[#7B2FF2]"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  disabled={items.length <= 1}
                  className="p-1.5 text-[#4A4A6A] hover:text-red-400 transition-colors disabled:opacity-30"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Tax (GST) & Discount Controls */}
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-5 space-y-4">
            <h3 className="text-white font-semibold text-sm">Tax & Discount Settings</h3>

            {/* GST Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#0E0E2C] border border-white/5">
              <div>
                <p className="text-white text-xs font-semibold">Enable GST Calculation</p>
                <p className="text-[#4A4A6A] text-[11px]">Turn ON to add GST percentage to subtotal</p>
              </div>
              <button
                type="button"
                onClick={() => setEnableGst(!enableGst)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  enableGst
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-[#7A7A9E]'
                }`}
              >
                {enableGst ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                {enableGst ? 'GST Enabled' : 'No GST (0%)'}
              </button>
            </div>

            {enableGst && (
              <div className="flex items-center gap-3">
                <label className="text-xs text-[#7A7A9E]">GST Rate (%):</label>
                <input
                  type="number"
                  value={gstRate}
                  onChange={e => setGstRate(Number(e.target.value) || 0)}
                  className="w-24 bg-[#0E0E2C] border border-white/10 rounded-xl px-3 py-1.5 text-white text-sm text-center focus:outline-none focus:border-[#7B2FF2]"
                />
              </div>
            )}

            {/* Discount Control */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <label className="text-xs text-[#7A7A9E] font-medium block">Apply Discount (Optional)</label>
              <div className="flex gap-2">
                <select
                  value={discountType}
                  onChange={e => setDiscountType(e.target.value as 'flat' | 'percent')}
                  className="bg-[#0E0E2C] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#7B2FF2]"
                >
                  <option value="flat">Flat Amount (₹)</option>
                  <option value="percent">Percentage (%)</option>
                </select>
                <input
                  type="number"
                  value={discountValue}
                  onChange={e => setDiscountValue(Number(e.target.value) || 0)}
                  placeholder="Discount value"
                  className="flex-1 bg-[#0E0E2C] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7B2FF2]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method & Bank Details */}
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-5 space-y-3">
            <h3 className="text-white font-semibold text-sm">Payment Details & Instructions</h3>
            <div className="space-y-2">
              <label className="text-xs text-[#7A7A9E]">Payment Method:</label>
              <input
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
                placeholder="e.g. Bank Transfer / UPI / Cash"
                className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-2 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-[#7A7A9E]">Bank / UPI Account Details:</label>
              <textarea
                value={paymentDetails}
                onChange={e => setPaymentDetails(e.target.value)}
                rows={2}
                placeholder="Bank account number, IFSC code, or UPI ID..."
                className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-2 text-white text-xs placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] resize-none"
              />
            </div>
          </div>

          {/* Terms & Notes */}
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-5 space-y-2">
            <h3 className="text-white font-semibold text-sm">Terms & Additional Notes</h3>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={2}
              className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] resize-none"
            />
          </div>
        </div>

        {/* Live Invoice Preview Column */}
        <div className="bg-white rounded-2xl p-8 space-y-6 h-fit sticky top-24 border border-[#E8E5F5] text-[#0E0E2C] shadow-xl">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#E8E5F5] pb-4">
            <div>
              <p className="text-2xl font-extrabold text-[#0E0E2C]">Prime<span className="text-[#7B2FF2]">Soul</span></p>
              <p className="text-[10px] uppercase tracking-widest text-[#7A7A9E]">Web Solutions</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#7B2FF2]">INVOICE</p>
              <p className="text-xs text-[#7A7A9E] font-mono">#{invoiceNumber}</p>
              <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider text-white uppercase ${
                status === 'paid' ? 'bg-green-500' : status === 'overdue' ? 'bg-red-500' : 'bg-amber-500'
              }`}>
                {status}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-[#F8F6FF] p-4 rounded-xl">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#7B2FF2] font-bold mb-1">Billed To</p>
              <p className="font-bold text-[#0E0E2C] text-sm">{clientName || 'Client Name'}</p>
              {clientEmail && <p className="text-[#7A7A9E]">{clientEmail}</p>}
              {projectName && <p className="text-[#4A4A6A] mt-1 font-medium">Project: {projectName}</p>}
            </div>
            <div className="text-right space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-[#7B2FF2] font-bold mb-1">Invoice Details</p>
              <p className="text-[#4A4A6A]">Date: <span className="font-semibold text-[#0E0E2C]">{date}</span></p>
              <p className="text-[#4A4A6A]">Due: <span className="font-semibold text-[#0E0E2C]">{dueDate || 'On Receipt'}</span></p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b-2 border-[#7B2FF2] bg-[#7B2FF2] text-white">
                <th className="text-left py-2 px-3 font-semibold uppercase tracking-wider">Item Description</th>
                <th className="text-right py-2 px-3 font-semibold uppercase tracking-wider">Qty</th>
                <th className="text-right py-2 px-3 font-semibold uppercase tracking-wider">Rate</th>
                <th className="text-right py-2 px-3 font-semibold uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-[#F0F0F5]">
                  <td className="py-2.5 px-3 font-medium text-[#0E0E2C]">{item.description || '—'}</td>
                  <td className="py-2.5 px-3 text-right text-[#4A4A6A]">{item.quantity}</td>
                  <td className="py-2.5 px-3 text-right text-[#4A4A6A]">₹{Number(item.rate).toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-[#0E0E2C]">₹{(Number(item.quantity) * Number(item.rate)).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary Row */}
          <div className="flex justify-between items-start pt-2 gap-4">
            <div className="flex-1 bg-[#F9FAFB] p-3 rounded-lg border border-[#E5E7EB] text-[11px]">
              <p className="font-bold text-[#374151] mb-1">Payment Instructions:</p>
              <p className="text-[#6B7280] leading-relaxed">{paymentDetails || 'Contact PrimeSoul for payment options.'}</p>
            </div>

            <div className="w-52 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#4A4A6A]">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-red-500 font-medium">
                  <span>Discount</span>
                  <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              {enableGst && (
                <div className="flex justify-between text-[#4A4A6A]">
                  <span>GST ({gstRate}%)</span>
                  <span>₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-[#0E0E2C] border-t-2 border-[#7B2FF2] pt-2 mt-1">
                <span>Total Due</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {notes && (
            <div className="p-3 bg-[#F8F6FF] border-l-4 border-[#7B2FF2] rounded-r-lg text-xs text-[#4A4A6A]">
              <p className="font-bold text-[#7B2FF2] mb-0.5">Notes:</p>
              <p>{notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
