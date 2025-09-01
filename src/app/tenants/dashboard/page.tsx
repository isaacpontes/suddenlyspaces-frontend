"use client";

import Title from "@/components/common/Title";
import PageContainer from "@/components/PageContainer";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <PageContainer>
      <main className="my-8">
        <Title>Hello, {user?.name}!</Title>

        <p>This is your dashboard. Here you will be able to:</p>
        <ul className="list-disc mt-3 *:ms-8 *:mt-1">
          <li>Check your favorite properties.</li>
          <li>Update your profile.</li>
          <li>And more...</li>
        </ul>
      </main>

    </PageContainer>
  );
}
