/**
 * TypingDNA - Typing Biometrics JavaScript API
 * https://www.typingdna.com/scripts/typingdna.js
 * https://api.typingdna.com/scripts/typingdna.js (alternative)
 *
 * GitHub repository
 * https://github.com/TypingDNA/TypingDnaRecorder-JavaScript
 *
 * @version 3.1
 * @author Raul Popa & Stefan Endres
 * @copyright TypingDNA Inc. https://www.typingdna.com
 * @license http://www.apache.org/licenses/LICENSE-2.0
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Typical usage:
 * var tdna = new TypingDNA(); // creates a new TypingDNA object and starts recording
 * var typingPattern = tdna.getTypingPattern({type:1, text:"Hello5g21?*"});
 * returns a type 1 typing pattern (and continues recording afterwards)
 *
 * Optional:
 * tdna.stop(); // ends recording and clears history stack (returns recording flag: false)
 * tdna.start(); // restarts the recording after a stop (returns recording flag: true)
 * tdna.reset(); // restarts the recording anytime, clears history stack and starts from scratch (returns nothing)
 * var typingPatternQuality = TypingDNA.getQuality(typingPattern); //returns the quality/strength of any typing pattern
 * (there is no need to initialize the class to do pattern quality checking)
 */
/**
 * Creates a single instance (or a reference) of the TypingDNA class
 * @return {Object} Returns the single instance of the TypingDNA class.
 * @example var tdna = new TypingDNA();
 */
declare function TypingDNA(): any;
