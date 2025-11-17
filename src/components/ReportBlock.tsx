'use client'
import { useState } from 'react'

export default function ReportBlock(){
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')

  async function handle(){
    setLoading(true); setText('')
    try{
      const res = await fetch('/api/report', { method:'POST' })
      const raw = await res.text()
      let data:any=null; try{ data = raw?JSON.parse(raw):null }catch{}
      if(!res.ok) { setText(data?.error || raw || `HTTP ${res.status}`); return }
      setText(data?.text || raw || '（空）')
    }catch(e:any){
      setText('网络或服务异常：' + (e?.message||String(e)))
    }finally{
      setLoading(false)
    }
  }

  return (
    <div style={{padding:16,border:'1px solid #ddd',borderRadius:8,background:'#fff',marginTop:12}}>
      <button onClick={handle} disabled={loading}
        style={{padding:'8px 16px',background:'#000',color:'#fff',borderRadius:6}}>
        {loading?'生成中…':'生成报告'}
      </button>
      <pre style={{whiteSpace:'pre-wrap',marginTop:12,color:'#444'}}>{text}</pre>
      <p style={{fontSize:12,color:'#666'}}>本内容仅作一般信息，不替代医疗建议。</p>
    </div>
  )
}
