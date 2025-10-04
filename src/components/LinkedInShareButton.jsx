import { Linkedin } from 'lucide-react';
import { generateLinkedInPostText, getLinkedInShareUrl } from '../utils/linkedin';

export function LinkedInShareButton({ milestone }) {
  const handleShare = () => {
    const postText = generateLinkedInPostText(milestone);
    const shareUrl = getLinkedInShareUrl(postText, 'https://milestone-celebrator.app');

    window.open(shareUrl, '_blank', 'width=600,height=600');
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
    >
      <Linkedin className="w-5 h-5" />
      Share on LinkedIn
    </button>
  );
}
