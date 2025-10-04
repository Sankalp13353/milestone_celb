import { GitPullRequest, Star, MessageCircle, GitCommitVertical as GitCommit, AlertCircle } from 'lucide-react';

const eventIcons = {
  pr_merged: GitPullRequest,
  star: Star,
  issue_opened: AlertCircle,
  commit: GitCommit,
  comment: MessageCircle,
};

export function Timeline({ events }) {
  if (!events || events.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-100">
        <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No recent events</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h3 className="font-semibold text-lg text-gray-900 mb-4">Recent Activity</h3>

      <div className="space-y-4">
        {events.map((event, index) => {
          const Icon = eventIcons[event.event_type] || MessageCircle;
          const isLast = index === events.length - 1;

          return (
            <div key={event.id} className="relative">
              <div className="flex gap-3">
                <div className="relative flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getEventBgColor(event.event_type)}`}>
                    <Icon className={`w-5 h-5 ${getEventIconColor(event.event_type)}`} />
                  </div>

                  {!isLast && (
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gray-200" />
                  )}
                </div>

                <div className="flex-1 pt-1">
                  <p className="text-sm text-gray-900 font-medium">
                    {getEventDescription(event)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {getTimeAgo(new Date(event.occurred_at))}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getEventBgColor(type) {
  const colors = {
    pr_merged: 'bg-blue-100',
    star: 'bg-yellow-100',
    issue_opened: 'bg-red-100',
    commit: 'bg-green-100',
    comment: 'bg-purple-100',
  };
  return colors[type] || 'bg-gray-100';
}

function getEventIconColor(type) {
  const colors = {
    pr_merged: 'text-blue-600',
    star: 'text-yellow-600',
    issue_opened: 'text-red-600',
    commit: 'text-green-600',
    comment: 'text-purple-600',
  };
  return colors[type] || 'text-gray-600';
}

function getEventDescription(event) {
  switch (event.event_type) {
    case 'pr_merged':
      return `Pull request #${event.event_data?.pr_number || 'N/A'} merged`;
    case 'star':
      return `New star from ${event.event_data?.starred_by || 'someone'}`;
    case 'issue_opened':
      return `Issue #${event.event_data?.issue_number || 'N/A'} opened`;
    case 'commit':
      return `New commit pushed`;
    case 'comment':
      return `New comment posted`;
    default:
      return 'Event occurred';
  }
}

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;

  return date.toLocaleDateString();
}
