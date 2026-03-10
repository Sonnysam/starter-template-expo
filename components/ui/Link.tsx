import { Href, Link as ExpoLink } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { Platform } from 'react-native';
import { type ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof ExpoLink>, 'href'> & { href: Href | string };

export function Link({ href, ...rest }: Props) {
  return (
    <ExpoLink
      target="_blank"
      {...rest}
      href={href as Href}
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          event.preventDefault();
          await openBrowserAsync(href as string, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    />
  );
}
