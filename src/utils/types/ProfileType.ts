import React, { ReactElement } from "react";

export interface ProfileOption {
  id: number;
  title: string;
  icon: ReactElement;
  onPress: () => void;
}
