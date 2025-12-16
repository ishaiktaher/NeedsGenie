"use client";
import { useEffect, useState } from "react";
import LeadCard from "@/components/LeadCard";
import UnlockModal from "@/components/UnlockModal";
import BottomNav from "@/components/BottomNav";

export default function Dashboard() {
  const [leads,setLeads]=useState([]);
  const [selectedLead,setSelectedLead]=useState(null);
  const [showModal,setShowModal]=useState(false);

  const fetchLeads = async () => {
    const res = await fetch("/api/leads");
    const data = await res.json();
    setLeads(data.leads);
  };

  const unlockLead = (lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  const confirmUnlock = async () => {
    const res = await fetch("/api/unlock",{ method:"POST", body:JSON.stringify({ leadId:selectedLead.id }) });
    const data = await res.json();
    setShowModal(false);
    alert("Lead Unlocked! Phone: " + data.phone);
  };

  useEffect(()=>{ fetchLeads(); },[]);

  return (
    <div className="py-6 pb-20">
      <h1 className="text-xl font-semibold mb-4">Lead Dashboard</h1>
      <div className="flex flex-col gap-4">
        {leads.map((lead)=>(
          <LeadCard key={lead.id} lead={lead} onUnlock={()=>unlockLead(lead)} />
        ))}
      </div>
      <UnlockModal show={showModal} lead={selectedLead} onClose={()=>setShowModal(false)} onConfirm={confirmUnlock}/>
      <BottomNav/>
    </div>
  );
}