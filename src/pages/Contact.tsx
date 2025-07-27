
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaWhatsapp, FaTelegram, FaPhone } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { contactInfo } from "@/data/appData";

export default function Contact() {
  const { t } = useLanguage();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="relative py-10 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t.contact.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                {t.contact.subtitle}
              </p>
              {/* Contact Action Icons */}
              <div className="flex justify-center gap-16 my-8">
                {/* WhatsApp */}
                <a
                  href={contactInfo.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex flex-col items-center group"
                >
                  <FaWhatsapp className="w-14 h-14 text-green-500 group-hover:scale-110 group-active:scale-95 transition-transform drop-shadow-lg" />
                  <span className="mt-2 text-base font-medium text-green-700">WhatsApp</span>
                </a>
                {/* Telegram */}
                <a
                  href={contactInfo.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="flex flex-col items-center group"
                >
                  <FaTelegram className="w-14 h-14 text-blue-500 group-hover:scale-110 group-active:scale-95 transition-transform drop-shadow-lg" />
                  <span className="mt-2 text-base font-medium text-blue-700">Telegram</span>
                </a>
                {/* Phone */}
                <a
                  href={`tel:${contactInfo.phone.primary.replace(/[^+\d]/g, "")}`}
                  aria-label="Phone"
                  className="flex flex-col items-center group"
                >
                  <FaPhone className="w-14 h-14 text-primary group-hover:scale-110 group-active:scale-95 transition-transform drop-shadow-lg" />
                  <span className="mt-2 text-base font-medium text-primary">Appeler</span>
                </a>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>

        {/* Contact Information & Map */}
        <section className="section py-10">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="animate-fade-in [animation-delay:100ms]">
                <div className="glass-card p-6 space-y-6 h-[400px] flex flex-col justify-center">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t.contact.address}</h3>
                      <p className="text-muted-foreground">
                        {contactInfo.address.street}<br />
                        {contactInfo.address.city}<br />
                        {contactInfo.address.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t.contact.phone}</h3>
                      <p className="text-muted-foreground">{contactInfo.phone.primary}</p>
                      <p className="text-muted-foreground">{contactInfo.phone.secondary}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t.contact.receptionHours}</h3>
                      <p className="text-muted-foreground">
                        {t.contact.receptionDays}: {contactInfo.hours.reception}<br />
                        {t.contact.checkInTime}<br />
                        {t.contact.checkOutTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="animate-fade-in [animation-delay:300ms]">
                <div className="h-[400px] rounded-xl overflow-hidden">
                  <iframe
                    src={contactInfo.map.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Location Map"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section py-10 bg-muted">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">{t.contact.faq}</h2>
              <p className="text-muted-foreground">
                {t.contact.faqSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in [animation-delay:200ms]">
              {[
                {
                  questionKey: "checkInOut",
                  icon: <Clock className="h-5 w-5 text-primary" />
                },
                {
                  questionKey: "parking",
                  icon: <MapPin className="h-5 w-5 text-primary" />
                },
                {
                  questionKey: "pets",
                  icon: <MapPin className="h-5 w-5 text-primary" />
                },
                {
                  questionKey: "restaurant",
                  icon: <MapPin className="h-5 w-5 text-primary" />
                },
                {
                  questionKey: "transfers",
                  icon: <MapPin className="h-5 w-5 text-primary" />
                },
                {
                  questionKey: "amenities",
                  icon: <MapPin className="h-5 w-5 text-primary" />
                },
              ].map((faq, index) => (
                <div key={index} className="glass-card p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    {t.contact.questions[faq.questionKey].question}
                  </h3>
                  <p className="text-muted-foreground">
                    {t.contact.questions[faq.questionKey].answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
