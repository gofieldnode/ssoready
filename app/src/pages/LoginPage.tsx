import React from "react";
import { Button } from "@/components/ui/button";
import { useConfig } from "@/config";
import { Title } from "@/components/Title";

export function LoginPage() {
  return (
    <>
      <Title title="Log in" />

      <div className="bg-white container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img src="/logo.svg" alt="SSOReady Logo" width="24" height="24" />
            <span className="ml-2">SSOReady</span>
          </div>
        </div>
        <div className="lg:p-8 h-full flex items-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Log in / sign up to SSOReady
              </h1>
            </div>

            <div className="grid gap-6">
              <div className="flex flex-col gap-y-2">
                <div className="flex justify-center">
                  <MicrosoftLogin />
                </div>
              </div>

              <div className="flex justify-center">
                <p className="text-sm text-muted-foreground text-center">
                  If you haven't created an account yet, any option will create
                  one for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MicrosoftLogin() {
  const {
    MICROSOFT_OAUTH_CLIENT_ID,
    MICROSOFT_OAUTH_REDIRECT_URI,
    MICROSOFT_OAUTH_AUTHORIZE_URL,
  } = useConfig();

  const microsoftRedirectUri = new URL(
    MICROSOFT_OAUTH_AUTHORIZE_URL ||
      "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
  );
  microsoftRedirectUri.searchParams.set("response_type", "code");
  microsoftRedirectUri.searchParams.set("response_mode", "query");
  microsoftRedirectUri.searchParams.set("scope", "openid profile email");
  microsoftRedirectUri.searchParams.set(
    "client_id",
    MICROSOFT_OAUTH_CLIENT_ID ?? "",
  );
  microsoftRedirectUri.searchParams.set(
    "redirect_uri",
    MICROSOFT_OAUTH_REDIRECT_URI ?? "",
  );

  console.log(microsoftRedirectUri);

  return (
    <Button variant="outline" asChild>
      <a
        className="flex items-center gap-x-[0.3rem] pl-[0.4rem] pr-[0.4rem] font-normal"
        href={microsoftRedirectUri.toString()}
      >
        <span>Continue with Microsoft</span>
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 48 48"
        >
          <path
            fill="#ff5722"
            d="M6 6H22V22H6z"
            transform="rotate(-180 14 14)"
          ></path>
          <path
            fill="#4caf50"
            d="M26 6H42V22H26z"
            transform="rotate(-180 34 14)"
          ></path>
          <path
            fill="#ffc107"
            d="M26 26H42V42H26z"
            transform="rotate(-180 34 34)"
          ></path>
          <path
            fill="#03a9f4"
            d="M6 26H22V42H6z"
            transform="rotate(-180 14 34)"
          ></path>
        </svg>
      </a>
    </Button>
  );
}
