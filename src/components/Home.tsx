import { Link } from 'react-router-dom';
import { Shield, Lock, Server, Database } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Comprehensive Cybersecurity Assessment
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Evaluate your organization's security posture with our advanced assessment tool.
          Get personalized recommendations and actionable insights.
        </p>
        
        <Link
          to="/assessment"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition-colors duration-300"
        >
          Start Your Assessment
        </Link>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: Shield,
            title: 'Security Analysis',
            description: 'Comprehensive evaluation of your security infrastructure'
          },
          {
            icon: Lock,
            title: 'Risk Assessment',
            description: 'Identify potential vulnerabilities and threats'
          },
          {
            icon: Server,
            title: 'Infrastructure Review',
            description: 'Detailed analysis of your IT infrastructure'
          },
          {
            icon: Database,
            title: 'Data Protection',
            description: 'Evaluate data security measures and compliance'
          }
        ].map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            <feature.icon className="h-12 w-12 text-cyan-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;