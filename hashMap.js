
export class HashMap {
  // Initialize the storage array.
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.data = new Array(this.capacity);
    this.length = 0; // Track the number of key-value pairs.
  }

  // A simple hash function to convert a string key into an array index.
  _hash(key) {
    let hash = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hash = (primeNumber * hash + key.charCodeAt(i)) % this.capacity;
    }
    return hash;
  }

  // Grow the capacity by double.
  grow() {
    this.capacity *= 2;
    const current = Array.from(this.data);
    this.clear();
    for (const bucket of current) {
      if (bucket) {
        for (const pair of bucket) {
          this.set(pair[0], pair[1]);
        }
      }
    }
  }

  // Inserts or updates a key-value pair.
  set(key, value) {
    const address = this._hash(key);
    if (!this.data[address]) {
      // If the spot is empty, create a new bucket (array) for potential collisions.
      this.data[address] = [];
    }

    // Handle collisions and updates within the bucket.
    const bucket = this.data[address];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        // Key already exists, update the value.
        bucket[i][1] = value;
        return;
      }
    }

    // Add new key-value pair to the bucket.
    bucket.push([key, value]);
    this.length++;
    if (this.length > this.capacity * this.loadFactor) {
      this.grow();
    }
  }

  // Retrieves a value by its key.
  get(key) {
    const address = this._hash(key);
    const bucket = this.data[address];
    if (bucket) {
      // Search the bucket for the correct key.
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          return bucket[i][1];
        }
      }
    }
    return undefined; // Key not found.
  }

  // Checks if a key exists in the hash map.
  has(key) {
    return this.get(key) !== undefined;
  }

  // Removes a key-value pair.
  remove(key) {
    const address = this._hash(key);
    const bucket = this.data[address];
    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket.splice(i, 1); // Remove the pair from the bucket.
          this.length--;
          return true;
        }
      }
    }
    return false; // Key not found.
  }

  // Number of stored keys
  size() {
    return `size: ${this.length}, capacity: ${this.capacity}`;
  }

  // Clears the hash map.
  clear() {
    this.data = new Array(this.capacity);
    this.length = 0;
  }

  // Returns an array of all keys.
  keys() {
    const keysArray = [];
    for (const bucket of this.data) {
      if (bucket) {
        for (const pair of bucket) {
          keysArray.push(pair[0]);
        }
      }
    }
    return keysArray;
  }

  // Returns an array of all values.
  values() {
    const valuesArray = [];
    for (const bucket of this.data) {
      if (bucket) {
        for (const pair of bucket) {
          valuesArray.push(pair[1]);
        }
      }
    }
    return valuesArray;
  }

  // Returns an array of all entries.
  entries() {
    const entriesArray = [];
    for (const bucket of this.data) {
      if (bucket) {
        for (const pair of bucket) {
          entriesArray.push(pair);
        }
      }
    }
    return entriesArray;
  }

}
