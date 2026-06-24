'use client'

import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, updateDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { FileText, Download, Plus, Trash2, Eye, Save, ChevronLeft, IndianRupee } from 'lucide-react'

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
  gst: number
  total: number
  notes: string
  status: 'unpaid' | 'paid'
  createdAt: unknown
}

export default function InvoiceGeneratorPage() {
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [projectName, setProjectName] = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState(`PS-${Date.now().toString().slice(-6)}`)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [dueDate, setDueDate] = useState('')
  const [notes, setNotes] = useState('Thank you for choosing PrimeSoul Web Solutions!')
  const [items, setItems] = useState<LineItem[]>([
    { id: 1, description: 'Website Design & Development', quantity: 1, rate: 7999 },
  ])
  const [showPreview, setShowPreview] = useState(false)

  // Past invoices
  const [savedInvoices, setSavedInvoices] = useState<SavedInvoice[]>([])
  const [viewMode, setViewMode] = useState<'create' | 'list'>('create')
  const [savingInvoice, setSavingInvoice] = useState(false)

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

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0)
  const gst = Math.round(subtotal * 0.18)
  const total = subtotal + gst

  const saveInvoice = async () => {
    if (!clientName.trim()) return
    setSavingInvoice(true)
    try {
      await addDoc(collection(db, 'invoices'), {
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        projectName: projectName.trim(),
        invoiceNumber,
        date,
        dueDate,
        items: items.map(({ description, quantity, rate }) => ({ description, quantity, rate })),
        subtotal,
        gst,
        total,
        notes,
        status: 'unpaid',
        createdAt: serverTimestamp(),
      })
      await fetchInvoices()
      alert('Invoice saved successfully!')
    } catch (err) {
      console.error('Error saving invoice:', err)
    } finally {
      setSavingInvoice(false)
    }
  }

  const toggleInvoiceStatus = async (invoiceId: string, current: string) => {
    const newStatus = current === 'paid' ? 'unpaid' : 'paid'
    try {
      await updateDoc(doc(db, 'invoices', invoiceId), { status: newStatus })
      setSavedInvoices(prev => prev.map(inv => inv.id === invoiceId ? { ...inv, status: newStatus as 'paid' | 'unpaid' } : inv))
    } catch (err) {
      console.error('Error updating invoice status:', err)
    }
  }

  const generatePDF = () => {
    const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Invoice ${invoiceNumber}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',sans-serif;color:#0E0E2C;background:#fff;padding:40px}
.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:40px;padding-bottom:24px;border-bottom:2px solid #E8E5F5}
.logo{font-size:28px;font-weight:800;color:#2AA7A7}
.logo-sub{font-size:11px;color:#7A7A9E;margin-top:2px}
.invoice-title{text-align:right}
.invoice-title h2{font-size:32px;color:#7B2FF2;font-weight:700}
.invoice-title p{font-size:13px;color:#7A7A9E;margin-top:4px}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:40px}
.info-box h4{font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#7B2FF2;margin-bottom:8px}
.info-box p{font-size:14px;color:#4A4A6A;line-height:1.6}
.info-box .value{font-weight:600;color:#0E0E2C}
table{width:100%;border-collapse:collapse;margin-bottom:32px}
thead{background:#F8F6FF}
th{text-align:left;padding:12px 16px;font-size:12px;font-weight:600;color:#7B2FF2;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #E8E5F5}
td{padding:14px 16px;font-size:14px;border-bottom:1px solid #F0F0F5}
.text-right{text-align:right}
.totals{margin-left:auto;width:280px}
.total-row{display:flex;justify-content:space-between;padding:8px 0;font-size:14px;color:#4A4A6A}
.total-row.grand{font-size:20px;font-weight:700;color:#0E0E2C;border-top:2px solid #7B2FF2;padding-top:12px;margin-top:8px}
.notes{margin-top:40px;padding:20px;background:#F8F6FF;border-radius:12px;font-size:13px;color:#4A4A6A;line-height:1.6}
.notes strong{color:#7B2FF2}
.footer{margin-top:40px;text-align:center;font-size:11px;color:#AEAEC8;padding-top:20px;border-top:1px solid #E8E5F5}
@media print{body{padding:20px}button{display:none!important}}
</style></head><body>
<div class="header">
  <div><div class="logo">PrimeSoul</div><div class="logo-sub">Web Solutions</div></div>
  <div class="invoice-title"><h2>INVOICE</h2><p>#${invoiceNumber}</p></div>
</div>
<div class="info-grid">
  <div class="info-box"><h4>Bill To</h4><p class="value">${clientName || 'Client Name'}</p><p>${clientEmail || 'client@email.com'}</p><p>${projectName ? `Project: ${projectName}` : ''}</p></div>
  <div class="info-box" style="text-align:right"><h4>Invoice Details</h4><p>Date: <span class="value">${new Date(date).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}</span></p>${dueDate ? `<p>Due: <span class="value">${new Date(dueDate).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}</span></p>` : ''}<p>Status: <span style="color:#10B981;font-weight:600">Pending</span></p></div>
</div>
<table><thead><tr><th>Description</th><th class="text-right">Qty</th><th class="text-right">Rate</th><th class="text-right">Amount</th></tr></thead><tbody>
${items.map(item => `<tr><td>${item.description || '—'}</td><td class="text-right">${item.quantity}</td><td class="text-right">₹${item.rate.toLocaleString()}</td><td class="text-right">₹${(item.quantity * item.rate).toLocaleString()}</td></tr>`).join('')}
</tbody></table>
<div class="totals">
  <div class="total-row"><span>Subtotal</span><span>₹${subtotal.toLocaleString()}</span></div>
  <div class="total-row"><span>GST (18%)</span><span>₹${gst.toLocaleString()}</span></div>
  <div class="total-row grand"><span>Total</span><span>₹${total.toLocaleString()}</span></div>
</div>
${notes ? `<div class="notes"><strong>Notes:</strong> ${notes}</div>` : ''}
<div class="footer"><p>PrimeSoul Web Solutions · Rajgarh, MP · contact@primesoul.tech · +91 8770404559</p></div>
<script>window.onload=()=>window.print()</script>
</body></html>`

    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
  }

  // List view
  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-white text-2xl font-bold">Past Invoices</h1>
            <p className="text-[#4A4A6A] text-sm mt-1">{savedInvoices.length} invoices saved</p>
          </div>
          <button onClick={() => setViewMode('create')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white hover:opacity-90 transition-all">
            <Plus size={16} /> New Invoice
          </button>
        </div>

        {savedInvoices.length === 0 ? (
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-12 text-center">
            <FileText size={40} className="text-[#4A4A6A] mx-auto mb-4" />
            <p className="text-[#7A7A9E] mb-2">No invoices saved yet</p>
            <p className="text-[#4A4A6A] text-sm">Create and save your first invoice</p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedInvoices.map(inv => (
              <div key={inv.id} className="bg-[#161640] border border-white/5 rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#7B2FF2]/10 flex items-center justify-center">
                    <IndianRupee size={18} className="text-[#7B2FF2]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{inv.clientName}</p>
                    <p className="text-[#4A4A6A] text-xs">{inv.invoiceNumber} · {inv.projectName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-white font-bold">₹{inv.total?.toLocaleString()}</p>
                  <button
                    onClick={() => toggleInvoiceStatus(inv.id, inv.status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${inv.status === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}
                  >
                    {inv.status === 'paid' ? '✓ Paid' : 'Unpaid'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold">Invoice Generator</h1>
          <p className="text-[#4A4A6A] text-sm mt-1">Create professional invoices and proposals</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setViewMode('list')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[#161640] text-[#7A7A9E] hover:text-white border border-white/5 transition-all">
            <FileText size={16} /> Past Invoices ({savedInvoices.length})
          </button>
          <button onClick={() => setShowPreview(!showPreview)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[#161640] text-[#7A7A9E] hover:text-white border border-white/5 transition-all">
            <Eye size={16} /> {showPreview ? 'Edit' : 'Preview'}
          </button>
          <button onClick={saveInvoice} disabled={savingInvoice} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition-all disabled:opacity-50">
            <Save size={16} /> {savingInvoice ? 'Saving...' : 'Save'}
          </button>
          <button onClick={generatePDF} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white hover:opacity-90 transition-all">
            <Download size={16} /> Download PDF
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-4">
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-6 space-y-4">
            <h3 className="text-white font-semibold text-sm flex items-center gap-2"><FileText size={16} className="text-[#7B2FF2]" /> Client Details</h3>
            <div className="grid grid-cols-2 gap-3">
              <input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Client name" className="bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2]" />
              <input value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder="Client email" className="bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2]" />
            </div>
            <input value={projectName} onChange={e => setProjectName(e.target.value)} placeholder="Project name" className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2]" />
            <div className="grid grid-cols-3 gap-3">
              <input value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} placeholder="Invoice #" className="bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2]" />
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#7B2FF2]" />
              <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} placeholder="Due date" className="bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#7B2FF2]" />
            </div>
          </div>

          {/* Line Items */}
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-6 space-y-4">
            <h3 className="text-white font-semibold text-sm">Line Items</h3>
            {items.map(item => (
              <div key={item.id} className="flex gap-2 items-start">
                <input value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} placeholder="Description" className="flex-1 bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2]" />
                <input type="number" value={item.quantity} onChange={e => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)} className="w-16 bg-[#0E0E2C] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm text-center focus:outline-none focus:border-[#7B2FF2]" />
                <input type="number" value={item.rate} onChange={e => updateItem(item.id, 'rate', parseInt(e.target.value) || 0)} placeholder="Rate" className="w-24 bg-[#0E0E2C] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm text-right focus:outline-none focus:border-[#7B2FF2]" />
                <button onClick={() => removeItem(item.id)} className="mt-2 text-[#4A4A6A] hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
              </div>
            ))}
            <button onClick={addItem} className="flex items-center gap-2 text-[#7B2FF2] text-sm font-medium hover:underline"><Plus size={14} /> Add item</button>
          </div>

          {/* Notes */}
          <div className="bg-[#161640] border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-semibold text-sm mb-3">Notes</h3>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4A4A6A] focus:outline-none focus:border-[#7B2FF2] resize-none" />
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-white rounded-2xl p-8 space-y-6 h-fit sticky top-24 border border-[#E8E5F5]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xl font-bold" style={{ color: '#2AA7A7' }}>PrimeSoul</p>
              <p className="text-[10px] text-[#7A7A9E]">Web Solutions</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#7B2FF2]">INVOICE</p>
              <p className="text-xs text-[#7A7A9E]">#{invoiceNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#7B2FF2] font-semibold mb-1">Bill To</p>
              <p className="font-semibold text-[#0E0E2C]">{clientName || 'Client Name'}</p>
              <p className="text-[#7A7A9E] text-xs">{clientEmail || 'email@example.com'}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-[#7B2FF2] font-semibold mb-1">Details</p>
              <p className="text-xs text-[#4A4A6A]">Date: {new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
            </div>
          </div>

          <table className="w-full text-sm">
            <thead><tr className="border-b-2 border-[#E8E5F5]">
              <th className="text-left py-2 text-[10px] uppercase tracking-wider text-[#7B2FF2]">Item</th>
              <th className="text-right py-2 text-[10px] uppercase tracking-wider text-[#7B2FF2]">Qty</th>
              <th className="text-right py-2 text-[10px] uppercase tracking-wider text-[#7B2FF2]">Rate</th>
              <th className="text-right py-2 text-[10px] uppercase tracking-wider text-[#7B2FF2]">Amount</th>
            </tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-[#F0F0F5]">
                  <td className="py-2 text-[#0E0E2C]">{item.description || '—'}</td>
                  <td className="py-2 text-right text-[#4A4A6A]">{item.quantity}</td>
                  <td className="py-2 text-right text-[#4A4A6A]">₹{item.rate.toLocaleString()}</td>
                  <td className="py-2 text-right font-medium text-[#0E0E2C]">₹{(item.quantity * item.rate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="ml-auto w-48 space-y-1 text-sm">
            <div className="flex justify-between text-[#4A4A6A]"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between text-[#4A4A6A]"><span>GST (18%)</span><span>₹{gst.toLocaleString()}</span></div>
            <div className="flex justify-between text-lg font-bold text-[#0E0E2C] border-t-2 border-[#7B2FF2] pt-2 mt-2"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
