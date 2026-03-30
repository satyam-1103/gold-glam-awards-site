import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ScrollReveal } from "@/components/ScrollReveal";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  Form, FormControl, FormField,
  FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

// ================= SCHEMA =================
const schema = z.object({
  fullName: z.string({ error: "Required Full Name" }).min(1, "Required Full Name"),
  email: z.string({ error: "Invalid Email ID" }).email(),
  phone: z.string({ error: "Invalid Phone Number" }).min(10),
  city: z.string({ error: "Required City Name" }).min(1),

  platform: z.string({ error: "Required Platform" }).min(1),
  profileLink: z.string().url(),
  followerRange: z.string().min(1),
  niche: z.string().min(1),

  workedWithBrands: z.string().min(1),
  brandDetails: z.string().optional(),

  awardCategory: z.string({ error: "Required Award Category" }).min(1),

  whyWin: z.string().min(10),

  feeConsent: z.string({ error: "Required Fee Consent" }).min(1),

  consent: z.boolean().refine(v => v === true, {
    message: "Required"
  }),

  is_referred: z.boolean().optional(),
  referal_code: z.string().optional(),
}).refine((data) => !data.is_referred || (data.referal_code && data.referal_code.trim().length > 0), {
  message: "Referral code is required when referrals selected",
  path: ["referal_code"]
});

type FormData = z.infer<typeof schema>;

// ================= STEP CONFIG =================
const steps = [
  ["fullName", "email", "phone", "city"],
  ["platform", "profileLink", "followerRange", "niche"],
  ["workedWithBrands"],
  ["awardCategory"],
  ["whyWin"],
  ["feeConsent", "consent"],
  ["is_referred", "referal_code"]
];

// ================= COMPONENT =================
export default function InfluencerMultiStepForm() {
  const [step, setStep] = useState(0);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const totalSteps = steps.length;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      workedWithBrands: "No",
      is_referred: false
    }
  });

  // ================= STEP VALIDATION =================
  const nextStep = async () => {
    const currentFields = steps[step];
    const valid = await form.trigger(currentFields as any);

    if (!valid) return;

    // extra condition for brands
    if (
      currentFields.includes("workedWithBrands") &&
      form.getValues("workedWithBrands") === "Yes" &&
      !form.getValues("brandDetails")
    ) {
      form.setError("brandDetails", { message: "Required" });
      return;
    }

    setStep(prev => prev + 1);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ================= SUBMIT =================
  const onSubmit = async (data: FormData) => {
    try {
      setSubmitting(true);

      const payload = {
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        city: data.city,

        platform: data.platform,
        profile_link: data.profileLink,
        follower_range: data.followerRange,
        niche: data.niche,

        worked_with_brands: data.workedWithBrands,
        brand_details: data.brandDetails || "",

        award_category: data.awardCategory,
        why_win: data.whyWin,

        fee_consent: data.feeConsent,
        consent: data.consent,

        amount: 2000,

        is_referred: Boolean(data.is_referred),
        referal_code: data.referal_code || "",
        created_at: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, "influencers"), payload);
      console.log("Document written with ID: ", docRef.id);

      setSubmitted(true);


      toast({ title: "Nomination Submitted! 🎉", description: "Redirecting you to the payment page..." });

      // Redirect to Razorpay payment link
      // We pass email, contact, and the Firestore document ID to help you track exactly who paid in Razorpay
      const paymentUrl = new URL("https://rzp.io/rzp/pWlD6Xb");
      paymentUrl.searchParams.append("email", data.email);
      paymentUrl.searchParams.append("contact", data.phone);
      paymentUrl.searchParams.append("notes[firestore_id]", docRef.id);

      window.location.href = paymentUrl.toString();

    } catch (error: any) {
      console.error("InfluencerForm submission error:", error);

      toast({
        title: "Submission Failed ❌",
        description: error?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
    finally {
      setSubmitting(false);
    }
  };

  // ================= UI =================
  return (
    <section id="influencer-form" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-2xl">

        <ScrollReveal className="text-center mb-10">
          <p className="text-primary font-sans uppercase tracking-widest text-sm mb-3">Nominate Yourself</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Influencer <span className="gradient-gold-text">Registration</span>
          </h2>
        </ScrollReveal>

        {/* Progress */}
        <div className="mb-6">
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-amber-500 rounded transition-all"
              style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            />
          </div>
          <p className="text-sm mt-2">
            Step {step + 1} of {totalSteps}
          </p>
        </div>

        <Form {...form} >


          <form onSubmit={form.handleSubmit(onSubmit)} className=" glass-card rounded-2xl p-6 md:p-8 space-y-6">

            {/* STEP 1 */}
            {step === 0 && (
              <>
                <h3 className="font-semibold text-lg">Basic Details</h3>

                <FormField name="fullName" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="email" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="phone" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="city" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </>
            )}

            {/* STEP 2 */}
            {step === 1 && (
              <>
                <h3 className="font-semibold text-lg">Social Media</h3>

                <FormField name="platform" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="YouTube">YouTube</SelectItem>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="profileLink" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Link</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="followerRange" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Followers</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1K-10K">1K–10K</SelectItem>
                        <SelectItem value="10K-50K">10K–50K</SelectItem>
                        <SelectItem value="50K-100K">50K–100K</SelectItem>
                        <SelectItem value="100K+">100K+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="niche" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Niche</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </>
            )}

            {/* STEP 3 */}
            {step === 2 && (
              <>
                <h3 className="font-semibold text-lg">Content</h3>

                <FormField name="workedWithBrands" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Worked with brands?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue="No">
                      <FormControl>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                {form.watch("workedWithBrands") === "Yes" && (
                  <FormField name="brandDetails" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand Details</FormLabel>
                      <FormControl><Textarea {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                )}
              </>
            )}

            {/* STEP 4 */}
            {step === 3 && (
              <>
                <h3 className="font-semibold text-lg">Award</h3>

                <FormField name="awardCategory" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Rising">Rising Influencer</SelectItem>
                        <SelectItem value="Travel">Travel</SelectItem>
                        <SelectItem value="Fashion">Fashion</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </>
            )}

            {/* STEP 5 */}
            {step === 4 && (
              <>
                <h3 className="font-semibold text-lg">Why You?</h3>

                <FormField name="whyWin" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why should you win?</FormLabel>
                    <FormControl><Textarea {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </>
            )}

            {/* STEP 6 */}
            {step === 5 && (
              <>
                <h3 className="font-semibold text-lg">Final</h3>

                <FormField name="feeConsent" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agree to ₹2000 fee?</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="consent" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>I agree to terms and conditions</FormLabel>
                    <FormMessage />
                  </FormItem>
                )} />
              </>
            )}

            {step === 6 && (
              <>
                <h3 className="font-semibold text-lg">Referral</h3>

                <FormField name="is_referred" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={Boolean(field.value)}
                        onChange={(event) => field.onChange(event.target.checked)}
                        className="mr-2"
                      />
                    </FormControl>
                    <FormLabel>Do you have a referral code?</FormLabel>
                    <FormMessage />
                  </FormItem>
                )} />

                {form.watch("is_referred") && (
                  <FormField name="referal_code" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Referral Code</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                )}
              </>
            )}

            {/* BUTTONS */}
            <div className="flex justify-between pt-4">
              {step > 0 && (
                <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
                  Back
                </Button>
              )}

              {step < totalSteps - 1 ? (
                <Button type="button" onClick={nextStep} disabled={isSubmitting}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting} size="lg" className="w-full gradient-gold text-primary-foreground font-semibold text-base py-6 rounded-full">
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              )}
            </div>

          </form>
        </Form>
      </div>
    </section>
  );
}