== Dataset ==
* A set of x values between 0 and 1.
* y = 0 if x <= 0.5
* y = 1 if x > 0.5

== Iteration 1 ==
* 20 iterations.
* Linear function: y = Wx
* sum(y_hat) = sum(scale(W, x))
* dy = sum_y - sum_y_hat
* dW = dy / Number of Samples
* W = W + dW
* dY Plot: iteration.1.jpg
* Accuracy: 0%
* Run details: iteration.1.results.json
* Conclusions: A linear discriminator can perfectly predict the input function. The model predicts the discriminator offsetted at the origin. The absence of bias causes invalid predictions.

== Iteration 2 ==
* A two node network. One node recieves a input and it trains the parameter. The second node trains an input independent parameter.