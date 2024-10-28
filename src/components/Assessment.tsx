import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, AlertCircle } from 'lucide-react';

const Assessment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    employeeCount: '',
    infrastructureType: '',
    currentSecurity: '',
    concerns: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setFile(file);
        setError('');
      } else {
        setError('Please upload a PDF file');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would process the form data and file here
    // For now, we'll just navigate to the quiz
    navigate('/quiz', { state: { assessmentData: formData } });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-gray-800 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Security Assessment Form</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Industry</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Number of Employees</label>
            <select
              name="employeeCount"
              value={formData.employeeCount}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              required
            >
              <option value="">Select range</option>
              <option value="1-50">1-50</option>
              <option value="51-200">51-200</option>
              <option value="201-500">201-500</option>
              <option value="501+">501+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Infrastructure Type</label>
            <input
              type="text"
              name="infrastructureType"
              value={formData.infrastructureType}
              onChange={handleInputChange}
              placeholder="e.g., Cloud-based, On-premise, Hybrid"
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Current Security Measures</label>
            <textarea
              name="currentSecurity"
              value={formData.currentSecurity}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Security Concerns</label>
            <textarea
              name="concerns"
              value={formData.concerns}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              required
            />
          </div>

          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6">
            <div className="text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium">
                    Upload additional documentation (PDF)
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  <span className="mt-2 block text-sm text-gray-400">
                    Optional: Upload infrastructure documentation
                  </span>
                </label>
              </div>
              {file && (
                <div className="mt-4 text-sm text-cyan-500">
                  {file.name}
                </div>
              )}
              {error && (
                <div className="mt-4 text-sm text-red-500 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {error}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-300"
          >
            Generate Assessment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Assessment;