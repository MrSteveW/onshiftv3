import type { InertiaLinkProps } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { toUrl } from '@/lib/utils';

export type IsCurrentUrlFn = (
    urlToCheck: NonNullable<InertiaLinkProps['href']>,
    currentUrl?: string,
) => boolean;

export type WhenCurrentUrlFn = <TIfTrue, TIfFalse = null>(
    urlToCheck: NonNullable<InertiaLinkProps['href']>,
    ifTrue: TIfTrue,
    ifFalse?: TIfFalse,
) => TIfTrue | TIfFalse;

export type UseCurrentUrlReturn = {
    currentUrl: string;
    isCurrentUrl: IsCurrentUrlFn;
    whenCurrentUrl: WhenCurrentUrlFn;
};

export function useCurrentUrl(): UseCurrentUrlReturn {
    const page = usePage();
    const currentUrlPath = new URL(page.url, window?.location.origin).pathname;

    const isCurrentUrl: IsCurrentUrlFn = (
        urlToCheck: NonNullable<InertiaLinkProps['href']>,
        currentUrl?: string,
    ) => {
        const urlToCompare = currentUrl ?? currentUrlPath;
        const urlString = toUrl(urlToCheck);
        let targetPath = urlString;

        if (urlString.startsWith('http')) {
            try {
                targetPath = new URL(urlString).pathname;
            } catch {
                return false;
            }
        }

        if (targetPath === '/') {
            return urlToCompare === '/';
        }

        const normalizedTarget = targetPath.endsWith('/')
            ? targetPath
            : `${targetPath}/`;
        const normalizedCurrent = urlToCompare.endsWith('/')
            ? urlToCompare
            : `${urlToCompare}/`;

        return normalizedCurrent.startsWith(normalizedTarget);
    };

    const whenCurrentUrl: WhenCurrentUrlFn = <TIfTrue, TIfFalse = null>(
        urlToCheck: NonNullable<InertiaLinkProps['href']>,
        ifTrue: TIfTrue,
        ifFalse: TIfFalse = null as TIfFalse,
    ): TIfTrue | TIfFalse => {
        return isCurrentUrl(urlToCheck) ? ifTrue : ifFalse;
    };

    return {
        currentUrl: currentUrlPath,
        isCurrentUrl,
        whenCurrentUrl,
    };
}
