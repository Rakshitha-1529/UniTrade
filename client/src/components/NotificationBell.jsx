import React, { useState } from "react";
import { Bell } from "lucide-react";

const NotificationBell = ({ notifications = [] }) => {
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.length;

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-3 z-50">
          <h4 className="font-semibold mb-2">Notifications</h4>

          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500">No notifications</p>
          ) : (
            notifications.map((note, index) => (
              <div
                key={index}
                className="text-sm border-b py-1 last:border-none"
              >
                {note}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;