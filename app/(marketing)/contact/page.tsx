// بریکٹ { } ہٹا دیں کیونکہ وہ Default Export ہے
import ContactInfo from "@/components/contact/contacthero";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 relative bottom-10">
      {/* اب یہاں ContactInfo استعمال کریں */}
      <ContactInfo /> 
    </main>
  );
}
