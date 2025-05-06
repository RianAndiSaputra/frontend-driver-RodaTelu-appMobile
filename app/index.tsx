import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to loading screen on app start
    router.replace('/halaman-awal/loadingscreen');
  }, [router]);

  return null;
}
