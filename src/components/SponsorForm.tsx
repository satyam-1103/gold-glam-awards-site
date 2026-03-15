import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SPONSORSHIP_TYPES } from "@/lib/categories";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ScrollReveal } from "@/components/ScrollReveal";
import { toast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

const schema = z.object({
  companyName: z.string().trim().min(1, "Required").max(200),
  contactPerson: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(10, "Invalid phone").max(15),
  website: z.string().trim().url("Enter a valid URL").max(500).or(z.literal("")),
  industry: z.string().trim().min(1, "Required").max(100),
  sponsorshipType: z.string().min(1, "Select a type"),
  message: z.string().trim().max(1000).optional(),
});

type FormData = z.infer<typeof schema>;

const SponsorForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: "", contactPerson: "", email: "", phone: "",
      website: "", industry: "", sponsorshipType: "", message: "",
    },
  });

  const onSubmit = () => {
    setSubmitted(true);
    toast({ title: "Sponsor Registration Submitted! 🎉", description: "Our team will contact you shortly." });
  };

  if (submitted) {
    return (
      <section id="sponsor-form" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Registration Received!</h2>
          <p className="text-muted-foreground">Our sponsorship team will reach out within 48 hours.</p>
          <Button className="mt-6 gradient-gold text-primary-foreground" onClick={() => { setSubmitted(false); form.reset(); }}>Submit Another</Button>
        </div>
      </section>
    );
  }

  return (
    <section id="sponsor-form" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-2xl">
        <ScrollReveal className="text-center mb-10">
          <p className="text-primary font-sans uppercase tracking-widest text-sm mb-3">Partner With Us</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Sponsor <span className="gradient-gold-text">Registration</span>
          </h2>
        </ScrollReveal>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="glass-card rounded-2xl p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField control={form.control} name="companyName" render={({ field }) => (
                <FormItem><FormLabel>Company Name</FormLabel><FormControl><Input placeholder="Company name" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="contactPerson" render={({ field }) => (
                <FormItem><FormLabel>Contact Person</FormLabel><FormControl><Input placeholder="Your name" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="email@company.com" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="Phone number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="website" render={({ field }) => (
              <FormItem><FormLabel>Website</FormLabel><FormControl><Input placeholder="https://company.com" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="industry" render={({ field }) => (
              <FormItem><FormLabel>Industry</FormLabel><FormControl><Input placeholder="e.g., Fashion, Tech, FMCG" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="sponsorshipType" render={({ field }) => (
              <FormItem>
                <FormLabel>Sponsorship Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                  <SelectContent>{SPONSORSHIP_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="message" render={({ field }) => (
              <FormItem><FormLabel>Message / Sponsorship Interest (Optional)</FormLabel><FormControl><Textarea placeholder="Tell us about your goals..." rows={4} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button type="submit" size="lg" className="w-full gradient-gold text-primary-foreground font-semibold text-base py-6 rounded-full">
              Submit Sponsor Registration
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default SponsorForm;
