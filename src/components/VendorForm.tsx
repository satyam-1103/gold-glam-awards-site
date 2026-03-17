import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SERVICE_TYPES } from "@/lib/categories";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ScrollReveal } from "@/components/ScrollReveal";
import { toast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";
import axios from "axios";

const schema = z.object({
  vendorName: z.string().trim().min(1, "Required").max(100),
  businessName: z.string().trim().min(1, "Required").max(200),
  serviceType: z.string().min(1, "Select a service type"),
  phone: z.string().trim().min(10, "Invalid phone").max(15),
  email: z.string().trim().email("Invalid email").max(255),
  instagram: z.string().trim().max(500).optional(),
});

type FormData = z.infer<typeof schema>;

const VendorForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { vendorName: "", businessName: "", serviceType: "", phone: "", email: "", instagram: "" },
  });

  const onSubmit = async (data: FormData) => {
  try {
    setLoading(true);

    const payload = {
      vendor_name: data.vendorName,
      business_name: data.businessName,
      service_type: data.serviceType,
      phone: data.phone,
      email: data.email,
      instagram_page: data.instagram,
      amount: 20000 // 🔥 vendor payment
    };

    const res = await axios.post(
      "https://influencers.digitacetechsolutions.com/api/vendors",
      payload
    );

    console.log(res.data);

    setSubmitted(true);

    toast({
      title: "Vendor Registration Submitted! 🎉",
      description: "Our team will contact you shortly.",
    });

    form.reset();

  } catch (error: any) {
    console.error(error);

    toast({
      title: "Submission Failed ❌",
      description: error?.response?.data?.message || "Something went wrong",
      variant: "destructive",
    });

  } finally {
    setLoading(false);
  }
};

  if (submitted) {
    return (
      <section id="vendor-form" className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Registration Received!</h2>
          <p className="text-muted-foreground">Thank you! We'll reach out shortly.</p>
          <Button className="mt-6 gradient-gold text-primary-foreground" onClick={() => { setSubmitted(false); form.reset(); }}>Submit Another</Button>
        </div>
      </section>
    );
  }

  return (
    <section id="vendor-form" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <ScrollReveal className="text-center mb-10">
          <p className="text-primary font-sans uppercase tracking-widest text-sm mb-3">Join As Vendor</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Vendor <span className="gradient-gold-text">Registration</span>
          </h2>
        </ScrollReveal>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="glass-card rounded-2xl p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField control={form.control} name="vendorName" render={({ field }) => (
                <FormItem><FormLabel>Vendor Name</FormLabel><FormControl><Input placeholder="Your name" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="businessName" render={({ field }) => (
                <FormItem><FormLabel>Business Name</FormLabel><FormControl><Input placeholder="Business name" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="serviceType" render={({ field }) => (
              <FormItem>
                <FormLabel>Service Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger></FormControl>
                  <SelectContent>{SERVICE_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="Phone number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="email@business.com" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="instagram" render={({ field }) => (
              <FormItem><FormLabel>Instagram Page (Optional)</FormLabel><FormControl><Input placeholder="https://instagram.com/page" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button type="submit" size="lg" className="w-full gradient-gold text-primary-foreground font-semibold text-base py-6 rounded-full">
              Submit Vendor Registration
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default VendorForm;
