import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(1, { message: "Please select a subject" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "booking",
      message: ""
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Using Formspree for the form submission
      const formspreeEndpoint = "https://formspree.io/f/your-formspree-id";
      
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. We'll get back to you soon.",
          variant: "default",
        });
        reset();
      } else {
        throw new Error("Something went wrong! Please try again.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-primary p-8 rounded-xl shadow-xl">
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
        <input 
          {...register("name")} 
          id="name"
          type="text" 
          className="w-full px-4 py-3 bg-secondary border border-accent/20 rounded-lg focus:outline-none focus:border-accent" 
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>
      
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
        <input 
          {...register("email")} 
          id="email"
          type="email" 
          className="w-full px-4 py-3 bg-secondary border border-accent/20 rounded-lg focus:outline-none focus:border-accent" 
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>
      
      <div className="mb-6">
        <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
        <select 
          {...register("subject")} 
          id="subject"
          className="w-full px-4 py-3 bg-secondary border border-accent/20 rounded-lg focus:outline-none focus:border-accent"
        >
          <option value="booking">Booking Inquiry</option>
          <option value="press">Press/Media</option>
          <option value="collaboration">Collaboration</option>
          <option value="other">Other</option>
        </select>
        {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
      </div>
      
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
        <textarea 
          {...register("message")} 
          id="message"
          rows={5} 
          className="w-full px-4 py-3 bg-secondary border border-accent/20 rounded-lg focus:outline-none focus:border-accent" 
        ></textarea>
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
      </div>
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-accent hover:bg-accent/90 rounded-lg font-medium transition duration-300 relative overflow-hidden group"
      >
        <span className="relative z-10">{isSubmitting ? "Sending..." : "Send Message"}</span>
        <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-[hsl(var(--purple))] to-accent transition-transform duration-300"></span>
      </button>
    </form>
  );
}
