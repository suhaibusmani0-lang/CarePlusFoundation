import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buniyad Scholarship Examination | Care Plus Foundation',
  description: 'An Educational Initiative to Identify, Encourage & Reward Student Potential. Scholarships & Prizes Worth ₹25 Lakh.',
};

export default function ScholarshipLandingPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <p className="text-yellow-400 font-bold tracking-widest uppercase mb-4 text-sm md:text-base">Care Plus Foundation Trust</p>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            BUNIYAD SCHOLARSHIP <br /> EXAMINATION
          </h1>
          <p className="text-xl md:text-2xl font-medium text-teal-100 mb-2">Building the Foundation of a Brighter Future</p>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            An Educational Initiative to Identify, Encourage & Reward Student Potential
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm md:text-base font-semibold">
            <span className="bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20">Class 1 to Class 12</span>
            <span className="bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20">Offline Examination</span>
            <span className="bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20">Registration Fee ₹270</span>
          </div>

          <div className="bg-yellow-500 text-teal-900 inline-block px-8 py-4 rounded-2xl mb-10 shadow-xl transform rotate-1">
            <p className="text-2xl md:text-3xl font-black uppercase">Scholarships & Prizes Worth ₹25 Lakh*</p>
          </div>

          <div>
            <Link href="/scholarship/apply" className="inline-block bg-white text-teal-900 font-bold text-lg px-12 py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
              REGISTER NOW
            </Link>
          </div>
          <p className="text-xs text-teal-200/60 mt-6 max-w-2xl mx-auto">
            *Scholarship/prize benefits are subject to the official BUNIYAD scholarship scheme, eligibility criteria, merit, verification, and applicable terms and conditions.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-teal-900 mb-4">1. About BUNIYAD</h2>
            <h3 className="text-xl font-semibold text-yellow-600 mb-4">A Strong Foundation Creates a Strong Future</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              The word "BUNIYAD" means foundation. Education is the foundation upon which a student's future is built. Strong fundamentals, regular learning, confidence, discipline, and the right opportunities can help students move towards their goals.
            </p>
            <p className="text-gray-600 leading-relaxed">
              BUNIYAD Scholarship Examination is an initiative designed to provide students with a platform to test their knowledge, challenge themselves, gain examination experience, and become eligible for scholarship and recognition opportunities. Through BUNIYAD, we aim to encourage a culture of learning and healthy academic competition among students.
            </p>
          </div>
          <div className="bg-teal-50 p-8 rounded-3xl border border-teal-100">
            <h2 className="text-2xl font-bold text-teal-900 mb-6">2. Our Purpose</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start"><span className="text-yellow-500 mr-2">✔</span> Encourage students towards academic excellence.</li>
              <li className="flex items-start"><span className="text-yellow-500 mr-2">✔</span> Strengthen fundamental concepts and learning habits.</li>
              <li className="flex items-start"><span className="text-yellow-500 mr-2">✔</span> Provide students with an opportunity to assess their knowledge.</li>
              <li className="flex items-start"><span className="text-yellow-500 mr-2">✔</span> Develop confidence through examination experience.</li>
              <li className="flex items-start"><span className="text-yellow-500 mr-2">✔</span> Encourage healthy academic competition.</li>
              <li className="flex items-start"><span className="text-yellow-500 mr-2">✔</span> Identify and recognize deserving student performance.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* At a Glance Table */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-teal-900 mb-8 text-center">Examination at a Glance</h2>
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
            <table className="w-full text-left">
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-bold text-gray-700 w-1/3">Organized By</td>
                  <td className="py-4 px-6 text-gray-600">CARE PLUS Foundation TRUST</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-bold text-gray-700">Eligible Classes</td>
                  <td className="py-4 px-6 text-gray-600">Class 1 to Class 12</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-bold text-gray-700">Examination Mode</td>
                  <td className="py-4 px-6 text-gray-600">Offline</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-bold text-gray-700">Registration Fee</td>
                  <td className="py-4 px-6 text-gray-600">₹270</td>
                </tr>
                <tr className="bg-teal-50">
                  <td className="py-4 px-6 font-bold text-teal-900">Scholarship Opportunity</td>
                  <td className="py-4 px-6 font-bold text-teal-700">₹25 Lakh*</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-bold text-gray-700">Examination Date & Centre</td>
                  <td className="py-4 px-6 text-gray-600">[TO BE ANNOUNCED]</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Participate */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-teal-900 mb-12 text-center">Why Should Students Participate?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Test Your Knowledge</h3>
              <p className="text-gray-600">Evaluate your understanding and academic preparation through a structured examination.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Challenge Yourself</h3>
              <p className="text-gray-600">Experience a competitive environment and challenge yourself to perform at your best.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Scholarship Opportunity</h3>
              <p className="text-gray-600">Eligible students may receive scholarships or prizes according to the official criteria.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Register Steps */}
      <section className="py-16 px-4 bg-teal-900 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">How to Register (Your Journey Starts Here)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-teal-800 p-6 rounded-2xl border border-teal-700">
              <span className="text-yellow-400 font-black text-lg block mb-2">STEP 1</span>
              <h3 className="font-bold mb-2">Check Eligibility</h3>
              <p className="text-teal-100 text-sm">Confirm that you meet the eligibility requirements for your class (Class 1 to 12).</p>
            </div>
            <div className="bg-teal-800 p-6 rounded-2xl border border-teal-700">
              <span className="text-yellow-400 font-black text-lg block mb-2">STEP 2</span>
              <h3 className="font-bold mb-2">Fill Form & Pay</h3>
              <p className="text-teal-100 text-sm">Enter student details carefully and pay the ₹270 registration fee.</p>
            </div>
            <div className="bg-teal-800 p-6 rounded-2xl border border-teal-700">
              <span className="text-yellow-400 font-black text-lg block mb-2">STEP 3</span>
              <h3 className="font-bold mb-2">Prepare & Appear</h3>
              <p className="text-teal-100 text-sm">Download syllabus and attend the offline examination at the allotted centre.</p>
            </div>
            <div className="bg-teal-800 p-6 rounded-2xl border border-teal-700">
              <span className="text-yellow-400 font-black text-lg block mb-2">STEP 4</span>
              <h3 className="font-bold mb-2">Scholarship / Recognition</h3>
              <p className="text-teal-100 text-sm">Check results and get considered for scholarships based on merit and criteria.</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/scholarship/apply" className="inline-block bg-yellow-500 text-teal-900 font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:bg-yellow-400 transition-all">
              PROCEED TO REGISTRATION
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-teal-900 mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg mb-2">What is BUNIYAD Scholarship Examination?</h3>
              <p className="text-gray-600">BUNIYAD is a scholarship examination initiative of CARE PLUS Foundation TRUST designed to encourage students to assess their knowledge, participate in an academic competition, and become eligible for scholarship and recognition opportunities.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg mb-2">Which classes are eligible & Is the exam online?</h3>
              <p className="text-gray-600">Students studying in Class 1 to Class 12 can participate. The examination is conducted entirely in OFFLINE mode at designated centres.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg mb-2">What is the registration fee?</h3>
              <p className="text-gray-600">The registration and examination fee is ₹270, which is to be paid during the online registration process.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg mb-2">Does every participant receive a scholarship?</h3>
              <p className="text-gray-600">No. Scholarship and prize benefits (up to ₹25 Lakh overall opportunity) are strictly subject to merit, applicable eligibility, and selection criteria.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer Banner */}
      <section className="py-12 bg-white text-center border-t border-gray-200">
        <h2 className="text-2xl font-bold text-teal-900 mb-2">BUILD YOUR BUNIYAD. SHAPE YOUR FUTURE.</h2>
        <p className="text-gray-500 mb-6">A Strong Foundation Today Can Lead to a Brighter Tomorrow.</p>
        <Link href="/scholarship/apply" className="inline-block bg-teal-900 text-white font-bold text-base px-8 py-3 rounded-full hover:bg-teal-800 transition-all">
          REGISTER NOW
        </Link>
      </section>
    </div>
  );
}

