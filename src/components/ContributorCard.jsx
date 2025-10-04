import { Award, Download, Share2 } from 'lucide-react';

export function BadgeDisplay({ badge }) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = badge.badge_image_url;
    link.download = `${badge.badge_name.replace(/\s+/g, '-')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: badge.badge_name,
        text: badge.badge_description,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <img
            src={badge.badge_image_url}
            alt={badge.badge_name}
            className="w-24 h-24 object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-lg text-gray-900 mb-1">
            {badge.badge_name}
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            {badge.badge_description}
          </p>

          {badge.contributor && (
            <div className="flex items-center gap-2 mb-3">
              <img
                src={badge.contributor.avatar_url}
                alt={badge.contributor.username}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm text-gray-700">
                Awarded to @{badge.contributor.username}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>

            {navigator.share && (
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              <Award className="w-3 h-3 inline mr-1" />
              Open Badges 2.0 Compliant
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
