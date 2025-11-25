import Link from "next/link";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-indigo-600 px-6 py-4">
            <Link href="/" className="flex items-center text-white hover:text-indigo-100">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
          
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
            
            <div className="prose prose-indigo max-w-none">
              <p className="text-gray-600 mb-6">
                Welcome to MyApp. These Terms and Conditions govern your use of our service and outline the rules and responsibilities for all users of our platform.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-6">
                By accessing and using MyApp, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. User Accounts</h2>
              <p className="text-gray-600 mb-4">
                <strong>2.1 Registration:</strong> To access certain features of our service, you must register for an account. You agree to provide accurate, current, and complete information during registration.
              </p>
              <p className="text-gray-600 mb-6">
                <strong>2.2 Account Security:</strong> You are responsible for safeguarding the password and all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-600 mb-4">
                <strong>3.1 Acceptable Use:</strong> You agree to use our service only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li>Use the service for any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>Violate any international, federal, provincial, or local laws or regulations</li>
                <li>Infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>Harass, abuse, insult, harm, defame, or discriminate against others</li>
                <li>Submit false or misleading information</li>
                <li>Upload viruses or other malicious code</li>
                <li>Spam, stalk, or harass others</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Privacy</h2>
              <p className="text-gray-600 mb-6">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our service, to understand our practices.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Intellectual Property Rights</h2>
              <p className="text-gray-600 mb-6">
                The service and its original content, features, and functionality are and will remain the exclusive property of MyApp and its licensors. The service is protected by copyright, trademark, and other laws.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Termination</h2>
              <p className="text-gray-600 mb-6">
                We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-600 mb-6">
                In no event shall MyApp, our directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, or other losses, resulting from your use of the service.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Changes to Terms</h2>
              <p className="text-gray-600 mb-6">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Contact Information</h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <p className="text-gray-600">
                  Email: legal@myapp.com<br />
                  Phone: (555) 123-4567<br />
                  Address: 123 Main Street, City, State 12345
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
