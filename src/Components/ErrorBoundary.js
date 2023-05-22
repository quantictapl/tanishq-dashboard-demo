import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state to indicate an error has occurred
    return { hasError: true };
  }

  componentDidCatch() {
    // Handle the error silently without logging or displaying it
    // You can add any custom error handling logic here
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI when an error occurs
      return null; // or any other component to render as a fallback
    }

    // Render the children normally
    return this.props.children;
  }
}

export default ErrorBoundary;