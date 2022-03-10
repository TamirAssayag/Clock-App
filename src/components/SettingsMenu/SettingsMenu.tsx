import React, { FC } from "react";
import { AnimatePresence } from "framer-motion";
import { SettingsCard } from "./SettingsCard";
import { SettingsMenuItem } from "./SettingsMenuItem";
import { ChangeBackground } from "./ChangeBackground";
import "./SettingsMenu.scss";

interface SettingsMenuProps {
  expanded?: boolean;
}

export const SettingsMenu: FC<SettingsMenuProps> = ({ expanded }) => {
  const [menuAnimDone, setMenuAnimDone] = React.useState(false);

  return (
    <AnimatePresence>
      {expanded && (
        <SettingsCard
          expanded={expanded}
          onAnimationComplete={() => setMenuAnimDone(true)}
        >
          <SettingsMenuItem
            itemTitle="Change Background"
            itemContent={menuAnimDone && <ChangeBackground />}
          />
        </SettingsCard>
      )}
    </AnimatePresence>
  );
};
