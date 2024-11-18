import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FilmSlate, Television, BookmarkSimple, Book, MagnifyingGlass, SignOut } from '@phosphor-icons/react';
import { ThemeToggle } from './components/ThemeToggle';
import { AuthGuard } from './components/AuthGuard';
import { useAuth } from './hooks/useAuth';
import { Home } from './pages/Home';
import { SearchPage } from './pages/SearchPage';
import { Movies } from './pages/Movies';
import { TVShows } from './pages/TVShows';
import { Diary } from './pages/Diary';
import { Collections } from './pages/Collections';
import { AuthPage } from './pages/AuthPage';

function App() {
  const { user, signOut } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-dark text-gray-900 dark:text-gray-100 transition-colors">
        {user && (
          <nav className="fixed top-0 z-50 w-full bg-white dark:bg-dark-card shadow-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                    <FilmSlate size={24} weight="bold" />
                    Popcorn Flix
                  </Link>
                </div>
                <div className="flex items-center gap-6">
                  <Link
                    to="/search"
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-lighter transition-colors"
                  >
                    <MagnifyingGlass size={20} weight="bold" />
                    Search
                  </Link>
                  <Link
                    to="/movies"
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-lighter transition-colors"
                  >
                    <FilmSlate size={20} weight="bold" />
                    Movies
                  </Link>
                  <Link
                    to="/tv"
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-lighter transition-colors"
                  >
                    <Television size={20} weight="bold" />
                    TV Shows
                  </Link>
                  <Link
                    to="/diary"
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-lighter transition-colors"
                  >
                    <Book size={20} weight="bold" />
                    Diary
                  </Link>
                  <Link
                    to="/collections"
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-lighter transition-colors"
                  >
                    <BookmarkSimple size={20} weight="bold" />
                    Collections
                  </Link>
                  <ThemeToggle />
                  <button
                    onClick={signOut}
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-lighter transition-colors"
                  >
                    <SignOut size={20} weight="bold" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}

        <main className="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<AuthGuard><Home /></AuthGuard>} />
            <Route path="/search" element={<AuthGuard><SearchPage /></AuthGuard>} />
            <Route path="/movies" element={<AuthGuard><Movies /></AuthGuard>} />
            <Route path="/tv" element={<AuthGuard><TVShows /></AuthGuard>} />
            <Route path="/diary" element={<AuthGuard><Diary /></AuthGuard>} />
            <Route path="/collections" element={<AuthGuard><Collections /></AuthGuard>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;