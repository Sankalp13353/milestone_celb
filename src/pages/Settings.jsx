import { useState } from 'react';
import { Save, X, Webhook, Github, AlertCircle } from 'lucide-react';

export function Settings({ onClose }) {
  const [formData, setFormData] = useState({
    githubWebhookUrl: '',
    githubWebhookSecret: '',
    slackWebhookUrl: '',
    discordWebhookUrl: '',
    linkedinClientId: '',
    linkedinClientSecret: '',
    notificationsEnabled: true,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('milestone-celebrator-settings', JSON.stringify(formData));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Configuration Required</p>
              <p>Set up webhooks and integrations to enable real-time milestone tracking and notifications.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Github className="w-5 h-5" />
                GitHub Webhook
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Webhook URL
                  </label>
                  <input
                    type="url"
                    name="githubWebhookUrl"
                    value={formData.githubWebhookUrl}
                    onChange={handleChange}
                    placeholder="https://your-domain.com/api/github-webhook"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Add this URL to your GitHub repository webhook settings
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Webhook Secret
                  </label>
                  <input
                    type="password"
                    name="githubWebhookSecret"
                    value={formData.githubWebhookSecret}
                    onChange={handleChange}
                    placeholder="Enter your webhook secret"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Webhook className="w-5 h-5" />
                Notification Webhooks
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slack Webhook URL
                  </label>
                  <input
                    type="url"
                    name="slackWebhookUrl"
                    value={formData.slackWebhookUrl}
                    onChange={handleChange}
                    placeholder="https://hooks.slack.com/services/..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Get this from your Slack workspace incoming webhooks
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discord Webhook URL
                  </label>
                  <input
                    type="url"
                    name="discordWebhookUrl"
                    value={formData.discordWebhookUrl}
                    onChange={handleChange}
                    placeholder="https://discord.com/api/webhooks/..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Create a webhook in your Discord server settings
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                LinkedIn Integration
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn Client ID
                  </label>
                  <input
                    type="text"
                    name="linkedinClientId"
                    value={formData.linkedinClientId}
                    onChange={handleChange}
                    placeholder="Enter your LinkedIn app client ID"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn Client Secret
                  </label>
                  <input
                    type="password"
                    name="linkedinClientSecret"
                    value={formData.linkedinClientSecret}
                    onChange={handleChange}
                    placeholder="Enter your LinkedIn app client secret"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Create a LinkedIn app with w_member_social scope for posting
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="notificationsEnabled"
                  checked={formData.notificationsEnabled}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Enable automatic notifications for milestones
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              <Save className="w-5 h-5" />
              Save Settings
            </button>
          </div>

          {saved && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
              Settings saved successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
