# convert_tflite.py
"""
Convert saved TF model to TFLite with int8 or float16 quantization.
"""

import tensorflow as tf
import numpy as np

# load training data for representative dataset
data = np.load("isl_dataset.npz")
X = data["X"].astype(np.float32)

converter = tf.lite.TFLiteConverter.from_saved_model("isl_saved_model")
converter.optimizations = [tf.lite.Optimize.DEFAULT]

def rep_gen():
    for i in range(min(500, len(X))):
        yield [X[i:i+1]]

# try full integer quant (if it works on ops)
try:
    converter.representative_dataset = rep_gen
    converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
    converter.inference_input_type = tf.int8
    converter.inference_output_type = tf.int8
    tflite_model = converter.convert()
    open("isl_model_int8.tflite", "wb").write(tflite_model)
    print("Saved isl_model_int8.tflite")
except Exception as e:
    print("Int8 quant failed, falling back to float16:", e)
    converter = tf.lite.TFLiteConverter.from_saved_model("isl_saved_model")
    converter.optimizations = [tf.lite.Optimize.DEFAULT]
    converter.target_spec.supported_types = [tf.float16]
    tflite_model = converter.convert()
    open("isl_model_fp16.tflite", "wb").write(tflite_model)
    print("Saved isl_model_fp16.tflite")