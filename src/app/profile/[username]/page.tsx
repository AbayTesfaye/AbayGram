import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/action/profile.action";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";
import { GetServerSidePropsContext } from "next";

// Correct typing for `params` to ensure Next.js understands the dynamic route
export async function generateMetadata({ params }: { params: { username: string } }) {
  const user = await getProfileByUsername(params.username);
  if (!user) return;

  return {
    title: `${user.name ?? user.username}`,
    description: user.bio || `Check out ${user.username}'s profile.`,
  };
}

// Correct typing for `params` to avoid treating it as a Promise
async function ProfilePageServer({ params }: GetServerSidePropsContext) {
  const { username } = params as { username: string }; // Explicitly cast params to the expected shape

  const user = await getProfileByUsername(username);

  if (!user) notFound();

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  );
}

export default ProfilePageServer;
