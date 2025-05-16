import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-secondary mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <div className="mb-10">
              <h2 className="text-4xl font-bold font-montserrat mb-3">Get In <span className="gradient-text">Touch</span></h2>
              <p className="text-[hsl(var(--light-text))] max-w-md">For bookings, press inquiries, or just to say hello.</p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-accent/10 p-3 rounded-full mr-4">
                  <i className="fas fa-envelope text-accent"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Email</h3>
                  <p className="text-[hsl(var(--light-text))]">curtisdovemusic@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-accent/10 p-3 rounded-full mr-4">
                  <i className="fas fa-map-marker-alt text-accent"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Based In</h3>
                  <p className="text-[hsl(var(--light-text))]">San Francisco, California</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-accent/10 p-3 rounded-full mr-4">
                  <i className="fas fa-users text-accent"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Social Media</h3>
                  <div className="flex space-x-4 mt-2">
                    <a href="https://www.facebook.com/CurtisDoveMusic" target="_blank" rel="noopener noreferrer" className="social-icon text-xl hover:text-accent">
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a href="https://www.instagram.com/curtisdovemusic" target="_blank" rel="noopener noreferrer" className="social-icon text-xl hover:text-accent">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="social-icon text-xl hover:text-accent">
                      <i className="fab fa-spotify"></i>
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon text-xl hover:text-accent">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
