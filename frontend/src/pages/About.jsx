export default function About() {
  return (
    <section className="min-h-screen bg-white py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-teal-600 mb-8 text-center">
          About Me
        </h1>

        <div className="bg-gray-50 shadow-sm rounded-2xl p-6 md:p-8 mb-10 border border-gray-200">
          <p className="text-gray-700 text-lg leading-relaxed">
            Hey there! 👋 I’m <span className="font-semibold text-teal-500">Abhijeet</span>, a passionate and curious{' '}
            <span className="text-indigo-600 font-semibold">Computer Science and Engineering</span> student. I love building things on the web,
            diving into code, and exploring how technology shapes the world around us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tech Stack */}
          <div className="bg-white shadow rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🔧</span> Tech Stack
            </h2>
            <ul className="text-gray-600 space-y-2 list-disc list-inside">
              <li>JavaScript</li>
              <li>React</li>
              <li>Node.js / Express</li>
              <li>MongoDB / SQL</li>
              <li>Git & GitHub</li>
            </ul>
          </div>

          {/* Interests */}
          <div className="bg-white shadow rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📚</span> Interests
            </h2>
            <ul className="text-gray-600 space-y-2 list-disc list-inside">
              <li>Web Development</li>
              <li>AI & Machine Learning</li>
              <li>UI/UX Design</li>
              <li>Problem Solving</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 italic text-base">
          “Code is like humor. When you have to explain it, it’s bad.”
        </div>
      </div>
    </section>
  );
}
