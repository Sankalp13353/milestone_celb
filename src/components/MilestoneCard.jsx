import { Trophy, Star, GitPullRequest, GitCommitVertical as GitCommit, MessageCircle, Calendar, ExternalLink } from 'lucide-react';

const iconMap = {
  stars_reached: Star,
  pr_count: GitPullRequest,
  issue_count: MessageCircle,
  commit_count: GitCommit,
  comment_count: MessageCircle,
  contribution_anniversary: Calendar,
};

export function MilestoneCard({ milestone }) {
  const Icon = iconMap[milestone.milestone_type] || Trophy;
  const timeAgo = getTimeAgo(new Date(milestone.achieved_at));

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${getIconBgColor(milestone.milestone_type)}`}>
          <Icon className={`w-6 h-6 ${getIconColor(milestone.milestone_type)}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg text-gray-900 leading-tight">
              {milestone.title}
            </h3>
            <span className="text-xs text-gray-500 whitespace-nowrap">{timeAgo}</span>
          </div>

          <p className="text-gray-600 mt-2 text-sm leading-relaxed">
            {milestone.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {milestone.contributor && (
              <div className="flex items-center gap-2">
                <img
                  src={milestone.contributor.avatar_url}
                  alt={milestone.contributor.username}
                  className="w-6 h-6 rounded-full"
                />
                <a
                  href={milestone.contributor.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                  @{milestone.contributor.username}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {milestone.repository && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <span className="text-gray-400">in</span>
                <span className="font-medium">{milestone.repository.name}</span>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(milestone.milestone_type)}`}>
              {milestone.milestone_type.replace('_', ' ').toUpperCase()}
            </span>

            {milestone.notified_slack && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                Slack ✓
              </span>
            )}

            {milestone.notified_discord && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                Discord ✓
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getIconBgColor(type) {
  const colors = {
    stars_reached: 'bg-yellow-100',
    pr_count: 'bg-blue-100',
    issue_count: 'bg-red-100',
    commit_count: 'bg-green-100',
    comment_count: 'bg-purple-100',
    contribution_anniversary: 'bg-orange-100',
  };
  return colors[type] || 'bg-gray-100';
}

function getIconColor(type) {
  const colors = {
    stars_reached: 'text-yellow-600',
    pr_count: 'text-blue-600',
    issue_count: 'text-red-600',
    commit_count: 'text-green-600',
    comment_count: 'text-purple-600',
    contribution_anniversary: 'text-orange-600',
  };
  return colors[type] || 'text-gray-600';
}

function getBadgeColor(type) {
  const colors = {
    stars_reached: 'bg-yellow-50 text-yellow-700',
    pr_count: 'bg-blue-50 text-blue-700',
    issue_count: 'bg-red-50 text-red-700',
    commit_count: 'bg-green-50 text-green-700',
    comment_count: 'bg-purple-50 text-purple-700',
    contribution_anniversary: 'bg-orange-50 text-orange-700',
  };
  return colors[type] || 'bg-gray-50 text-gray-700';
}

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

  return date.toLocaleDateString();
}
