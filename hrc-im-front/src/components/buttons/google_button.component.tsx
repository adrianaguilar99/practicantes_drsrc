import { AppProvider, AuthProvider, SignInPage } from '@toolpad/core';

export const GoogleButtonComponent = () => {
    const providers = [
        { id: 'google', name: 'Google' },
      ];
      
      const signIn: (provider: AuthProvider) => void = async (provider) => {
        const promise = new Promise<void>((resolve) => {
          setTimeout(() => {
            console.log(`Sign in with ${provider.id}`);
            resolve();
          }, 500);
        });
        return promise;
      };

    return (
        
            <SignInPage signIn={signIn} providers={providers} />
    )
}