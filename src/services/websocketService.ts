class WebSocketService {
  private url: string; // URL to connect to the WebSocket server
  private websocket: WebSocket | null = null; // Instance of WebSocket
  private reconnectInterval: number; // Interval for reconnecting
  private maxRetries: number; // Maximum number of reconnect attempts
  private retries: number = 0; // Current count of reconnect attempts
  private eventHandlers: { [key: string]: Function[] } = {}; // Storage for event handlers
  private shouldReconnect: boolean = true; // Flag to control reconnection behavior

  constructor(
    url: string,
    options: { reconnectInterval?: number; maxRetries?: number } = {},
  ) {
    this.url = url;
    this.reconnectInterval = options.reconnectInterval || 5000; // Default reconnect interval is 5 seconds
    this.maxRetries = options.maxRetries || 10; // Default max retries is 10
  }

  /**
   * Connect to the WebSocket server.
   */
  connect(): void {
    if (this.websocket) {
      console.warn('WebSocket is already connected or connecting.');
      return;
    }

    this.websocket = new WebSocket(this.url);

    // Handle connection opening
    this.websocket.onopen = () => {
      console.log('WebSocket connected:', this.url);
      this.retries = 0; // Reset the reconnect attempt counter
      this.emit('open'); // Notify subscribers about the connection
    };

    // Handle incoming messages
    this.websocket.onmessage = (message: MessageEvent) => {
      try {
        const parsedData = JSON.parse(message.data);
        this.emit('message', parsedData); // Notify subscribers about the received message
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    // Handle WebSocket errors
    this.websocket.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
      this.emit('error', error); // Notify subscribers about the error
    };

    // Handle connection closure
    this.websocket.onclose = (event: CloseEvent) => {
      console.warn('WebSocket closed:', event.reason);
      this.emit('close', event); // Notify subscribers about the closure
      this.websocket = null;

      // Attempt reconnection if allowed
      if (this.shouldReconnect && this.retries < this.maxRetries) {
        this.retries++;
        console.log(
          `Reconnecting in ${this.reconnectInterval / 1000} seconds...`,
        );
        setTimeout(() => this.connect(), this.reconnectInterval);
      }
    };
  }

  /**
   * Close the WebSocket connection.
   */
  close(): void {
    this.shouldReconnect = false;
    if (this.websocket) {
      this.websocket.close();
    }
    this.websocket = null;
  }

  /**
   * Send data through the WebSocket connection.
   * @param {Object} data - Data to be sent.
   */
  send(data: object): void {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket is not open. Message not sent:', data);
    }
  }

  /**
   * Subscribe to an event.
   * @param {string} event - Name of the event ('open', 'message', 'error', 'close').
   * @param {Function} callback - Callback function to handle the event.
   */
  on(event: string, callback: Function): void {
    if (!this.eventHandlers[event]) {
      this.eventHandlers[event] = [];
    }
    this.eventHandlers[event].push(callback);
  }

  /**
   * Unsubscribe from an event.
   * @param {string} event - Name of the event.
   * @param {Function} callback - Callback function to be removed.
   */
  off(event: string, callback: Function): void {
    if (!this.eventHandlers[event]) return;

    this.eventHandlers[event] = this.eventHandlers[event].filter(
      (handler) => handler !== callback,
    );
  }

  /**
   * Emit an event to all its subscribers.
   * @param {string} event - Name of the event.
   * @param {any} data - Data to be passed to the event handlers.
   */
  private emit(event: string, data?: any): void {
    if (!this.eventHandlers[event]) return;

    this.eventHandlers[event].forEach((handler) => handler(data));
  }
}

export default WebSocketService;
