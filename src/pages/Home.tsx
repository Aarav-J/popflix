import React from 'react';

export function Home() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {/* Trending media cards will go here */}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold text-gray-900">Recent Diary Entries</h2>
        <div className="mt-6 space-y-6">
          {/* Recent diary entries will go here */}
        </div>
      </section>
    </div>
  );
}