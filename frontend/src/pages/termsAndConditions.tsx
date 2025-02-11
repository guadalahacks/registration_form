export default function TermsAndConditions() {
    return (
      <div className="min-h-screen w-full bg-gradient-to-r from-[#E91E63] to-[#FF5B51] p-6 md:p-12">
        {/* Decorative circles */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-white/10"></div>
          <div className="absolute right-[15%] top-[60%] h-40 w-40 rounded-full bg-white/10"></div>
          <div className="absolute bottom-[10%] left-[20%] h-24 w-24 rounded-full bg-white/10"></div>
        </div>
  
        <div className="relative mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-xl md:p-12">
          <h1 className="mb-8 text-center text-3xl font-bold text-[#E91E63]">GuadalaHacks Terms and Conditions</h1>
  
          <div className="space-y-8">
            {/* Privacy Policy Section */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Privacy Policy</h2>
  
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-medium text-gray-700">1. Introduction</h3>
                  <p className="text-gray-600">
                    Welcome to GuadalaHacks. We value your privacy and are committed to protecting your personal
                    information. This Privacy Policy explains how we collect, use, store, and share your data when you use
                    https://guadalahacks.com/ and https://registro.guadalahacks.com/ (collectively, "the Services").
                  </p>
                </div>
  
                <div>
                  <h3 className="mb-2 text-lg font-medium text-gray-700">2. Information We Collect</h3>
                  <p className="mb-2 text-gray-600">
                    When you register for GuadalaHacks, we collect the following personal data:
                  </p>
                  <ul className="ml-6 list-disc space-y-1 text-gray-600">
                    <li>Name, age, email, phone number</li>
                    <li>Student ID, school, major, level of study, anticipated graduation year</li>
                    <li>Technical skills, past hackathon experience</li>
                    <li>Dietary restrictions, allergies, accessibility needs</li>
                    <li>Emergency contact details (name, relationship, phone number, email)</li>
                    <li>Resume and additional links (if provided)</li>
                    <li>Shirt size and other event-specific preferences</li>
                  </ul>
                </div>
  
                <div>
                  <h3 className="mb-2 text-lg font-medium text-gray-700">3. How We Use Your Information</h3>
                  <ul className="ml-6 list-disc space-y-1 text-gray-600">
                    <li>Process your registration for GuadalaHacks</li>
                    <li>Communicate event updates and important information</li>
                    <li>Improve our services and user experience</li>
                    <li>Ensure participant safety and accessibility accommodations</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </div>
            </section>
  
            {/* Terms of Service Section */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Terms of Service</h2>
  
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-medium text-gray-700">1. Acceptance of Terms</h3>
                  <p className="text-gray-600">
                    By using GuadalaHacks websites and services, you agree to these Terms of Service. If you do not agree,
                    do not use our Services.
                  </p>
                </div>
  
                <div>
                  <h3 className="mb-2 text-lg font-medium text-gray-700">2. Eligibility</h3>
                  <p className="text-gray-600">
                    To participate in GuadalaHacks, you must be at least 18 years old or have parental/guardian consent.
                    You must provide accurate registration information.
                  </p>
                </div>
  
                <div>
                  <h3 className="mb-2 text-lg font-medium text-gray-700">3. User Responsibilities</h3>
                  <p className="mb-2 text-gray-600">You agree to:</p>
                  <ul className="ml-6 list-disc space-y-1 text-gray-600">
                    <li>Follow the event <a href="https://guadalahacks.com/cdc" className="text-[#E91E63] hover:underline">code of conduct</a></li>
                    <li>Provide accurate and truthful information</li>
                    <li>Respect other participants and organizers</li>
                    <li>Abide by event rules and regulations</li>
                  </ul>
                  <p className="mt-2 mb-2 text-gray-600">You may not:</p>
                  <ul className="ml-6 list-disc space-y-1 text-gray-600">
                    <li>Use the Services for any illegal activities</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Harass or harm other participants</li>
                  </ul>
                </div>
              </div>
            </section>
  
            {/* Contact Section */}
            <section className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="mb-4 text-lg font-medium text-gray-700">Contact Information</h3>
              <p className="text-gray-600">
                For questions or concerns about these terms, please email us at:{" "}
                <a href="mailto:cristobal@guadalahacks.com" className="text-[#E91E63] hover:underline">
                  cristobal@guadalahacks.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    )
}
  