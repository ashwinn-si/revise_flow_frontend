import { useState } from 'react';

interface UseLoadingOptions {
  defaultLoading?: boolean;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useLoading = (options: UseLoadingOptions = {}) => {
  const [loading, setLoading] = useState(options.defaultLoading || false);
  const [error, setError] = useState<string | null>(null);

  const startLoading = () => {
    setLoading(true);
    setError(null);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const handleError = (err: any) => {
    setLoading(false);
    setError(err?.message || 'An error occurred');
    options.onError?.(err);
  };

  const handleSuccess = () => {
    setLoading(false);
    options.onSuccess?.();
  };

  const withLoading = async (asyncFn: () => Promise<any>) => {
    try {
      startLoading();
      const result = await asyncFn();
      handleSuccess();
      return result;
    } catch (err) {
      handleError(err);
      throw err;
    }
  };

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    handleError,
    handleSuccess,
    withLoading,
  };
};

export default useLoading;