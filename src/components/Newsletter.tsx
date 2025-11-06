"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Mail, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your email service
    console.log("Newsletter signup:", email);
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 md:p-12 text-white shadow-xl">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
          <Mail className="w-8 h-8" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {getTranslation(language, 'newsletterTitle')}
        </h2>
        <p className="text-lg text-orange-50 mb-8">
          {getTranslation(language, 'newsletterSubtitle')}
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={getTranslation(language, 'enterEmail')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/90 backdrop-blur-sm border-0 text-zinc-900 placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-white"
            />
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="whitespace-nowrap"
            >
              {getTranslation(language, 'subscribeNow')}
            </Button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
            <CheckCircle className="w-6 h-6" />
            <p className="font-semibold">{getTranslation(language, 'thanksSubscribing')}</p>
          </div>
        )}

        <p className="text-xs text-orange-50 mt-4">
          {getTranslation(language, 'newsletterDisclaimer')}
        </p>
      </div>
    </div>
  );
}
