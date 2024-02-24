type TypographyType = {
  regular: string;
  medium: string;
  bold: string;
};

interface ApiError {
  data?: {
    message?: string;
  };
}
