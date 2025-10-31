import * as tf from "@tensorflow/tfjs";

interface ScalerData {
  mean: number[];
  scale: number[];
}

interface PredictionInput {
  lat: number;
  lon: number;
  day: number;
  month: number;
  year: number;
}

const normalize = (input: number[], mean: number[], scale: number[]) =>
  input.map((v, i) => (v - mean[i]) / scale[i]);

export const predict = async ({ lat, lon, day, month, year }: PredictionInput) => {
  lat = (90 - lat) * 2;
  lon = (lon + 180) * (575 / 360);

  const modelos = ['hum', 'pres', 'rain', 'snow', 'temp', 'wind'];

  const dict: { [key: string]: number } = {};

  for (const modelo of modelos) {
    const originalModel  = await tf.loadLayersModel(`/models/${modelo}_small/model.json`);
    console.log(originalModel)
    const fixedModel = tf.sequential();
    fixedModel.add(tf.layers.inputLayer({ inputShape: [5] }));
    for (const layer of originalModel.layers) {
      fixedModel.add(layer);
    }
    const scalerResponse = await fetch(`/models/${modelo}_small/scaler.json`);
    const scaler: ScalerData = await scalerResponse.json();

    const inputRaw = [lat, lon, day, month, year];

    const inputScaled = normalize(inputRaw, scaler.mean, scaler.scale);

    const inputTensor = tf.tensor2d([inputScaled]);
    const output = fixedModel.predict(inputTensor) as tf.Tensor;
    const value = (await output.data())[0];

    dict[modelo] = value;

    tf.dispose([inputTensor, output]);
    model.dispose();
  }
  console.log({dict});
  return dict;
}