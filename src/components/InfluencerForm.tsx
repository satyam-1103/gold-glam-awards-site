import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ALL_CATEGORIES, TIERS } from "@/lib/categories";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ScrollReveal } from "@/components/ScrollReveal";
import { toast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

const schema = z.object({
  fullName: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(10, "Invalid phone").max(15),
  city: z.string().trim().min(1, "Required").max(100),
  instagram: z.string().trim().url("Enter a valid URL").max(500),
  otherLinks: z.string().max(500).optional(),
  followerCount: z.string().trim().min(1, "Required").max(20),
  category: z.string().min(1, "Select a category"),
  tier: z.string().min(1, "Select a tier"),
  bio: z.string().trim().max(500).optional(),
  whyWin: z.string().trim().min(10, "Tell us why you deserve this").max(1000),
});

type FormData = z.infer<typeof schema>;

const InfluencerForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "", email: "", phone: "", city: "", instagram: "",
      otherLinks: "", followerCount: "", category: "", tier: "", bio: "", whyWin: "",
    },
  });

  const onSubmit = (data: FormData) => {
    setSubmitted(true);
    toast({ title: "Nomination Submitted! 🎉", description: "We'll review your nomination and get back to you soon." });
  };

  if (submitted) {
    return (
      <section id="influencer-form" className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Nomination Received!</h2>
          <p className="text-muted-foreground">Thank you for your submission. We'll be in touch soon.</p>
          <Button className="mt-6 gradient-gold text-primary-foreground" onClick={() => { setSubmitted(false); form.reset(); }}>
            Submit Another
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="influencer-form" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <ScrollReveal className="text-center mb-10">
          <p className="text-primary font-sans uppercase tracking-widest text-sm mb-3">Nominate Yourself</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Influencer <span className="gradient-gold-text">Registration</span>
          </h2>
        </ScrollReveal>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="glass-card rounded-2xl p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Your full name" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="you@email.com" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="Your phone number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="city" render={({ field }) => (
                <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Your city" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <FormField control={form.control} name="instagram" render={({ field }) => (
              <FormItem><FormLabel>Instagram Profile Link</FormLabel><FormControl><Input placeholder="https://instagram.com/yourprofile" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="otherLinks" render={({ field }) => (
              <FormItem><FormLabel>Other Social Links (Optional)</FormLabel><FormControl><Input placeholder="YouTube, Twitter, etc." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="followerCount" render={({ field }) => (
              <FormItem><FormLabel>Follower Count</FormLabel><FormControl><Input placeholder="e.g., 25K" {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Choose category" /></SelectTrigger></FormControl>
                    <SelectContent>{ALL_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="tier" render={({ field }) => (
                <FormItem>
                  <FormLabel>Influencer Tier</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Choose tier" /></SelectTrigger></FormControl>
                    <SelectContent>{TIERS.map(t => <SelectItem key={t.label} value={t.label}>{t.label} ({t.range})</SelectItem>)}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="bio" render={({ field }) => (
              <FormItem><FormLabel>Short Bio (Optional)</FormLabel><FormControl><Textarea placeholder="Tell us about yourself..." rows={3} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="whyWin" render={({ field }) => (
              <FormItem><FormLabel>Why should you win this award?</FormLabel><FormControl><Textarea placeholder="Share your achievements and impact..." rows={4} {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <Button type="submit" size="lg" className="w-full gradient-gold text-primary-foreground font-semibold text-base py-6 rounded-full">
              Nominate Yourself
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default InfluencerForm;
