import { cookies } from "next/headers";
import { getSessionFromCookie } from "@/lib/session";

export default async function DebugSessionPage() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  
  const sessionCookie = cookieStore.get('__Secure-better-auth.session_data');
  
  let parsedSession = null;
  let parseError = null;
  
  if (sessionCookie?.value) {
    try {
      parsedSession = JSON.parse(sessionCookie.value);
    } catch (error) {
      parseError = error instanceof Error ? error.message : 'Unknown error';
    }
  }

  const session = await getSessionFromCookie();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🔍 Session Debug Page</h1>
      
      <div className="space-y-6">
        {/* All Cookies */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">📦 All Cookies ({allCookies.length})</h2>
          <div className="space-y-2">
            {allCookies.map((cookie) => (
              <div key={cookie.name} className="bg-gray-50 p-2 rounded">
                <strong>{cookie.name}</strong>: {cookie.value.substring(0, 50)}...
              </div>
            ))}
          </div>
        </div>

        {/* Session Cookie */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">🍪 Session Cookie</h2>
          {sessionCookie ? (
            <div className="bg-gray-50 p-3 rounded">
              <pre className="text-xs overflow-auto">{sessionCookie.value}</pre>
            </div>
          ) : (
            <p className="text-red-500">❌ No session cookie found</p>
          )}
        </div>

        {/* Parsed Session */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">📝 Parsed Session Data</h2>
          {parseError ? (
            <p className="text-red-500">❌ Parse Error: {parseError}</p>
          ) : parsedSession ? (
            <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto">
              {JSON.stringify(parsedSession, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-500">No session data</p>
          )}
        </div>

        {/* Extracted Session */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">✅ Extracted Session (from helper)</h2>
          {session ? (
            <div className="space-y-2">
              <div className="bg-green-50 p-3 rounded">
                <h3 className="font-semibold">User Info:</h3>
                <ul className="list-disc list-inside">
                  <li>ID: {session.user.id}</li>
                  <li>Name: {session.user.name}</li>
                  <li>Email: {session.user.email}</li>
                  <li>Role: <strong className="text-purple-600">{session.user.role}</strong></li>
                  <li>Status: {session.user.status}</li>
                </ul>
              </div>
              {session.session && (
                <div className="bg-blue-50 p-3 rounded">
                  <h3 className="font-semibold">Session Info:</h3>
                  <ul className="list-disc list-inside">
                    <li>Session ID: {session.session.id}</li>
                    <li>Expires: {new Date(session.session.expiresAt).toLocaleString()}</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-red-500">❌ No session extracted</p>
          )}
        </div>

        {/* Actions */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">🎯 Next Steps</h2>
          {session ? (
            <div className="space-y-2">
              <p className="text-green-600">✅ Session is valid! You should be able to access dashboards.</p>
              <div className="flex gap-2">
                <a 
                  href="/student-dashboard" 
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Go to Student Dashboard
                </a>
                <a 
                  href="/tutor-dashboard" 
                  className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                >
                  Go to Tutor Dashboard
                </a>
                <a 
                  href="/admin-dashboard" 
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Go to Admin Dashboard
                </a>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-red-600 mb-3">❌ No session found. Please login first.</p>
              <a 
                href="/login" 
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
              >
                Go to Login
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
