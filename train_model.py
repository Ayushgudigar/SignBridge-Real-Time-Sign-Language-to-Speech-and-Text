# train_model.py
"""
Train LSTM model on landmark sequences. Saves isl_lstm.h5 and saved_model/ for TFLite conversion.
"""

import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
import joblib

data = np.load("isl_dataset.npz")
X, y = data["X"], data["y"]
print("Loaded dataset:", X.shape, "labels:", np.unique(y).shape)

# train/val split
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.15, stratify=y, random_state=42)

num_classes = len(np.unique(y))
input_shape = X.shape[1:]  # (T, D)

model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=input_shape),
    tf.keras.layers.Masking(mask_value=0.0),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(128, return_sequences=True)),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(64)),
    tf.keras.layers.Dense(128, activation="relu"),
    tf.keras.layers.Dropout(0.4),
    tf.keras.layers.Dense(num_classes, activation="softmax")
])

model.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])
model.summary()

callbacks = [
    tf.keras.callbacks.ModelCheckpoint("best_isl.h5", save_best_only=True, monitor="val_accuracy", mode="max"),
    tf.keras.callbacks.EarlyStopping(monitor="val_loss", patience=6, restore_best_weights=True)
]

history = model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=60, batch_size=32, callbacks=callbacks)

# save final model and saved_model for converter
model.save("isl_lstm.h5")
model.save("isl_saved_model", save_format="tf")
print("Saved models: isl_lstm.h5 and isl_saved_model/")