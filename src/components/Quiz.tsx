import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer?: number;
}

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Generate questions based on assessment data
  const questions: Question[] = [
    {
      id: 1,
      question: 'Which of the following best describes your current data backup strategy?',
      options: [
        'No regular backups',
        'Weekly backups',
        'Daily backups with encryption',
        'Real-time backup with redundancy'
      ]
    },
    {
      id: 2,
      question: 'How often do you conduct security awareness training for employees?',
      options: [
        'Never',
        'Once a year',
        'Quarterly',
        'Monthly with regular updates'
      ]
    },
    {
      id: 3,
      question: 'What type of access control system do you implement?',
      options: [
        'No formal system',
        'Basic password protection',
        'Multi-factor authentication',
        'Zero-trust architecture'
      ]
    },
    {
      id: 4,
      question: 'How do you handle incident response?',
      options: [
        'No formal process',
        'Basic documentation only',
        'Documented procedures with occasional testing',
        'Comprehensive plan with regular drills'
      ]
    },
    {
      id: 5,
      question: 'What level of network monitoring do you maintain?',
      options: [
        'No monitoring',
        'Basic firewall logs',
        '24/7 monitoring without automation',
        'Automated 24/7 monitoring with AI detection'
      ]
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    // In a real application, this would be more sophisticated
    const totalScore = answers.reduce((acc, answer) => {
      return acc + (answer === 3 ? 20 : answer === 2 ? 15 : answer === 1 ? 10 : 5);
    }, 0);
    setScore(totalScore);
  };

  const getRecommendations = () => {
    if (score >= 80) {
      return {
        icon: CheckCircle2,
        color: 'text-green-500',
        message: 'Your security posture is strong. Focus on maintaining and improving current measures.',
        details: [
          'Consider advanced threat hunting capabilities',
          'Implement AI-powered security analytics',
          'Enhance automation in security processes'
        ]
      };
    } else if (score >= 50) {
      return {
        icon: AlertTriangle,
        color: 'text-yellow-500',
        message: 'Your security measures need some improvements.',
        details: [
          'Implement multi-factor authentication',
          'Enhance employee security training',
          'Develop comprehensive incident response plans'
        ]
      };
    } else {
      return {
        icon: XCircle,
        color: 'text-red-500',
        message: 'Significant security improvements are needed.',
        details: [
          'Establish basic security policies and procedures',
          'Implement regular backup systems',
          'Deploy essential security tools and monitoring'
        ]
      };
    }
  };

  useEffect(() => {
    if (!location.state?.assessmentData) {
      navigate('/assessment');
    }
  }, [location, navigate]);

  if (showResults) {
    const recommendation = getRecommendations();
    const RecommendationIcon = recommendation.icon;

    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Assessment Results</h2>
          
          <div className="text-center mb-8">
            <div className="inline-block p-4 rounded-full bg-gray-700 mb-4">
              <RecommendationIcon className={`h-16 w-16 ${recommendation.color}`} />
            </div>
            <div className="text-4xl font-bold mb-2">Score: {score}%</div>
            <p className="text-xl text-gray-300">{recommendation.message}</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Key Recommendations:</h3>
            <ul className="space-y-4">
              {recommendation.details.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-cyan-500 mr-2 flex-shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => navigate('/assessment')}
            className="mt-8 w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-300"
          >
            Start New Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-gray-800 rounded-lg p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Security Assessment Quiz</h2>
            <span className="text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl mb-4">{questions[currentQuestion].question}</h3>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full text-left p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-300"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;