import { useState } from 'react';
import { Trophy, Users, Activity, Star } from 'lucide-react';
import { Header } from '../components/Header';
import { StatsCard } from '../components/StatsCard';
import { MilestoneCard } from '../components/MilestoneCard';
import { ContributorCard } from '../components/ContributorCard';
import { Timeline } from '../components/Timeline';
import { LinkedInShareButton } from 'src/components/LinkedInShareButton.jsx';
import { BadgeDisplay } from '../components/BadgeDisplay';
import { Settings } from './Settings';
import { mockDashboardStats, mockEvents, mockMilestones } from '../api/mockData';
import { generateBadgeImageUrl, createOpenBadgeAssertion, getBadgeName, getBadgeCriteria } from '../utils/badges';

export function Dashboard() {
  const [showSettings, setShowSettings] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const stats = mockDashboardStats;
  const recentEvents = mockEvents.slice(0, 10);

  const badges = mockMilestones.slice(0, 3).map(milestone => {
    const badgeImageUrl = generateBadgeImageUrl(milestone.milestone_type, milestone.milestone_value);
    const assertion = milestone.contributor
      ? createOpenBadgeAssertion(milestone, milestone.contributor, badgeImageUrl)
      : null;

    return {
      id: `badge-${milestone.id}`,
      milestone_id: milestone.id,
      contributor_id: milestone.contributor_id,
      badge_name: getBadgeName(milestone.milestone_type, milestone.milestone_value),
      badge_description: milestone.description,
      badge_image_url: badgeImageUrl,
      badge_criteria: getBadgeCriteria(milestone.milestone_type, milestone.milestone_value),
      assertion_json: assertion,
      issued_at: milestone.achieved_at,
      created_at: milestone.created_at,
      contributor: milestone.contributor,
      milestone: milestone,
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header onSettingsClick={() => setShowSettings(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={Trophy}
            label="Total Milestones"
            value={stats.totalMilestones}
            color="yellow"
          />
          <StatsCard
            icon={Users}
            label="Contributors"
            value={stats.totalContributors}
            color="blue"
          />
          <StatsCard
            icon={Activity}
            label="Events Tracked"
            value={stats.totalEvents}
            color="green"
          />
          <StatsCard
            icon={Star}
            label="Repositories"
            value={stats.totalRepositories}
            color="purple"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Recent Milestones</h2>
              </div>
              <div className="space-y-4">
                {stats.recentMilestones.map(milestone => (
                  <div key={milestone.id}>
                    <MilestoneCard milestone={milestone} />
                    <div className="mt-2 ml-14 flex gap-2">
                      <LinkedInShareButton milestone={milestone} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Top Contributors</h2>
              <div className="space-y-3">
                {stats.topContributors.map(contributor => (
                  <ContributorCard
                    key={contributor.id}
                    contributor={contributor}
                    milestoneCount={contributor.milestone_count}
                  />
                ))}
              </div>
            </div>

            <Timeline events={recentEvents} />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map(badge => (
              <BadgeDisplay key={badge.id} badge={badge} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Connect GitHub</h3>
              <p className="text-sm text-gray-600">
                Set up webhooks to track repository events in real-time
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Detect Milestones</h3>
              <p className="text-sm text-gray-600">
                Automatically identify achievements and award digital badges
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 text-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Celebrate Together</h3>
              <p className="text-sm text-gray-600">
                Share on LinkedIn and notify your team via Slack or Discord
              </p>
            </div>
          </div>
        </div>
      </main>

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  );
}
export function Dashboard() 