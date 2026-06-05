import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Copy, Upload, CheckCircle2, Loader2, MessageCircle, FileImage } from "lucide-react";
import { supabase } from "../lib/supabase.ts";
import { motion, AnimatePresence } from "motion/react";

export default function SecureCheckout() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copiedBank1, setCopiedBank1] = useState(false);
  const [copiedBank2, setCopiedBank2] = useState(false);

  useEffect(() => {
    const savedSuccess = localStorage.getItem("bootcamp_checkout_success");
    if (savedSuccess === "true") {
      setSuccess(true);
    }
    
    // CRITICAL: Retrieve saved image preview in case of browser minimizing
    const savedPreview = localStorage.getItem("bootcamp_draft_receipt");
    if (savedPreview) {
      setPreview(savedPreview);
      // We can't perfectly reconstruct the File object from localStorage for upload easily
      // but we will allow them to re-upload if needed, or if file state is kept by React mobile state it's fine.
    }
  }, []);

  const handleCopy1 = () => {
    navigator.clipboard.writeText("2007161746");
    setCopiedBank1(true);
    setTimeout(() => setCopiedBank1(false), 2000);
  };

  const handleCopy2 = () => {
    navigator.clipboard.writeText("8081515375");
    setCopiedBank2(true);
    setTimeout(() => setCopiedBank2(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        localStorage.setItem("bootcamp_draft_receipt", base64String);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        localStorage.setItem("bootcamp_draft_receipt", base64String);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file && !preview) return; // Need file or at least a saved state if they try to bypass, but realistically we need file
    if (!file) {
      setError("Please reselect your file. Session was refreshed.");
      return;
    }
    
    setUploading(true);
    setError("");

    try {
      const userId = localStorage.getItem("bootcamp_user_id");
      if (!userId) {
        throw new Error("Session expired. Please register again.");
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('payment_proofs')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('payment_proofs')
        .getPublicUrl(fileName);

      const { error: updateError, data: userData } = await supabase
        .from('bootcamp_initiates')
        .update({ receipt_url: publicUrl })
        .eq('id', userId)
        .select()
        .single();
        
      if (updateError) throw updateError;

      await fetch('/api/webhook/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: userData.full_name,
          phone_number: userData.phone_number,
          receipt_url: publicUrl
        })
      });

      setSuccess(true);
      localStorage.setItem("bootcamp_checkout_success", "true");
      localStorage.removeItem("bootcamp_draft_receipt");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to process upload.");
    } finally {
      setUploading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6 bg-slate-50">
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[-10%] w-[60%] h-[60%] bg-green-100/50 rounded-full blur-[120px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-md w-full glass-card p-12 text-center flex flex-col items-center gap-8 rounded-3xl relative z-10"
        >
          <motion.div
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ type: "spring", delay: 0.2, bounce: 0.5 }}
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center neo-shadow">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </motion.div>
          
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Proof Uploaded.</h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Await response from June Studio for your unique access code. We will verify your transaction shortly.
            </p>
          </div>

          <a 
            href="https://wa.me/2348081515375?text=Hello%20June%20Studio,%20I%20just%20uploaded%20my%20proof%20of%20action%20for%20the%20bootcamp"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] text-white shadow-[#25D366]/30 shadow-xl font-bold py-4 rounded-xl hover:bg-[#20bd5a] transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] mt-4"
          >
            <MessageCircle className="w-6 h-6" /> Send a Copy to WhatsApp
          </a>

          <Link to="/" className="text-sm text-slate-400 font-semibold hover:text-slate-600 transition-colors mt-2">
            Return to Homepage
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-orange-50/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none" />

      <header className="p-6 lg:px-12 flex justify-center border-b border-slate-200/50 backdrop-blur-md relative z-20">
        <span className="font-bold tracking-tight text-slate-400">Step 2: Payment & Verification</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 py-12 max-w-xl mx-auto w-full gap-8 relative z-10">
        
        {/* Tilt/Parallax Card 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full relative rounded-3xl glass-card p-8 neo-shadow"
        >
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
               <div>
                 <p className="text-xs uppercase tracking-widest text-blue-600 font-bold mb-1">Bank 1</p>
                 <p className="text-xl font-bold tracking-tight text-slate-800">Kuda MFB</p>
               </div>
               <div className="text-right">
                 <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Amount</p>
                 <p className="text-xl font-bold tracking-tight text-slate-800">₦5,000</p>
               </div>
            </div>

            <div className="flex justify-between items-end pb-2">
               <div>
                 <p className="text-xs font-semibold text-slate-500 mb-1">Sheriff-Akorede Sulaiman</p>
                 <p className="text-4xl font-extrabold tracking-tighter text-blue-600">2007161746</p>
               </div>
               <button 
                 onClick={handleCopy1}
                 className={`p-3 rounded-xl transition-colors ${copiedBank1 ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
               >
                 {copiedBank1 ? <CheckCircle2 className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
               </button>
            </div>
          </div>
        </motion.div>

        {/* Tilt/Parallax Card 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className="w-full relative rounded-3xl glass-card p-8 neo-shadow"
        >
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
               <div>
                 <p className="text-xs uppercase tracking-widest text-orange-500 font-bold mb-1">Bank 2</p>
                 <p className="text-xl font-bold tracking-tight text-slate-800">Opay / Palmpay</p>
               </div>
               <div className="text-right">
                 <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Amount</p>
                 <p className="text-xl font-bold tracking-tight text-slate-800">₦5,000</p>
               </div>
            </div>

            <div className="flex justify-between items-end pb-2">
               <div>
                 <p className="text-xs font-semibold text-slate-500 mb-1">Sulaiman Sheriff-Akorede</p>
                 <p className="text-4xl font-extrabold tracking-tighter text-orange-600">8081515375</p>
               </div>
               <button 
                 onClick={handleCopy2}
                 className={`p-3 rounded-xl transition-colors ${copiedBank2 ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
               >
                 {copiedBank2 ? <CheckCircle2 className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
               </button>
            </div>
          </div>
        </motion.div>

        {/* Upload Zone */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full relative overflow-hidden mt-4"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input 
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`w-full border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-4 relative overflow-hidden group ${preview ? 'border-blue-500 bg-white shadow-xl' : 'border-slate-300 hover:border-blue-400 bg-white/50 hover:bg-white'}`}
          >
            {uploading && <div className="absolute inset-0 bg-blue-500/10 animate-pulse z-20" />}
            
            {preview ? (
              <div className="relative w-full rounded-2xl overflow-hidden aspect-video z-10 flex items-center justify-center bg-slate-100">
                {preview.startsWith('data:application/pdf') ? (
                   <FileImage className="w-24 h-24 text-blue-500" />
                ) : (
                   <img src={preview} alt="Receipt preview" className="max-w-full max-h-full object-contain" />
                )}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-xl">
                     <Upload className="w-6 h-6" />
                   </div>
                   <p className="text-white font-bold tracking-wide">Replace File</p>
                </div>
              </div>
            ) : (
              <div className="z-10 flex flex-col items-center justify-center py-6">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner">
                  <Upload className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-slate-800 mb-2">Upload Receipt</h3>
                <p className="text-sm font-medium text-slate-500">Drag & drop or click to browse</p>
              </div>
            )}
          </div>
        </motion.div>

        {error && <div className="text-red-500 text-sm font-bold bg-red-50 px-4 py-3 rounded-xl w-full text-center">{error}</div>}

        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleSubmit}
          disabled={!preview || uploading}
          className="w-full neo-button text-white font-bold text-lg py-5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20"
        >
          {uploading ? (
            <span className="flex items-center gap-3"><Loader2 className="w-6 h-6 animate-spin" /> Verifying...</span>
          ) : "Submit Proof & Continue"}
        </motion.button>
      </main>
    </div>
  );
}
