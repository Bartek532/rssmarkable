import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { memo } from "react";

import { useWindowSize } from "../../../hooks/useWindowSize";
import { Avatar } from "../../common/Avatar";

import type { Session } from "next-auth";

interface ProfileProps {
  readonly user: Session["user"];
  readonly isRegistered: boolean;
}

export const Profile = memo<ProfileProps>(({ user, isRegistered }) => {
  const { width } = useWindowSize();

  if (!user) {
    return null;
  }

  return (
    <div className="min-w-0 flex-1">
      <div className="flex items-center">
        {width > 640 && <Avatar image={user.image} name={user.name} />}

        <div>
          <div className="flex items-center">
            {width <= 640 && <Avatar image={user.image} name={user.name} />}
            <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9 dark:text-gray-100">
              Welcome back, {user.name?.split(" ")[0] ?? user.email}!
            </h1>
          </div>
          <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
            <dt className="sr-only dark:text-gray-300">Account status</dt>
            <dd className="mt-3 flex items-center text-sm font-medium text-gray-500 sm:mr-6 sm:mt-0">
              {isRegistered ? (
                <>
                  <CheckCircleIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                    aria-hidden="true"
                  />
                  <span className="dark:text-gray-400">
                    Device registered - sync active
                  </span>
                </>
              ) : (
                <>
                  <XCircleIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-400"
                    aria-hidden="true"
                  />
                  Device not registered - sync inactive
                </>
              )}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
});

Profile.displayName = "Profile";
