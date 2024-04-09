from flask import Flask, request, jsonify

from flask import Flask, request, jsonify
from flask_cors import CORS


# ... (Your count_mistakes function goes here)
import Levenshtein
import re   
from collections import Counter

def similarity(word1, word2):
    similarity = 1 - Levenshtein.distance(word1, word2) / max(len(word1), len(word2))
    return similarity

def helper(word1,word2):
    if word1== word2:
        return -1
    elif word1!=word2 and word1.lower()==word2.lower():
        return 1
  
    elif word1!=word2 and similarity(word1,word2) >= 0.5:
        # print(similarity(word1,word2))
        return 0

    else:
        return 2

mistakes = {'spelling': [], 'missing': [], 'extra': [], 'case': [], 'paramistake': []}



def count_mistakes(original, answer):
    global mistakes
    mistakes = {
    'spelling': [],
    'missing': [],
    'extra': [],
    'case': [],
  
    'paramistake': []
    }

    paramis=original.count("\n")-answer.count("\n")
    original = original.replace("\n"," ")
    answer = answer.replace("\n"," ")
    for i in range(abs(paramis)):
        mistakes['paramistake'].append('a')

    original_words = original.split()
    answer_words = answer.split()

    # global mistakes
    
    # print(str(len(original_words)) + " " + str(len(answer_words)))
    i = 0
    j = 0

    while i < len(original_words) and j < len(answer_words):
        if j < len(answer_words)-1:
            xd = j+1
            vd = i+1
        else:
            xd = j
            vd = i
        if helper(original_words[i], answer_words[j]) == -1:   
            i = i + 1
            j = j + 1
        elif helper(original_words[i], answer_words[j]) == 0 and helper(original_words[i], answer_words[xd]) in [0,2]:
            mistakes['spelling'].append(answer_words[j])

            i = i + 1
            j = j + 1
        elif helper(original_words[i], answer_words[j]) == 0 and helper(original_words[i], answer_words[xd]) not in [0,2]:
            mistakes['extra'].append(answer_words[j])


            j = j + 1
        elif helper(original_words[i], answer_words[j]) == 1:
            mistakes['case'].append(answer_words[j])
            
            i = i + 1
            j = j + 1
            
        elif helper(original_words[i], answer_words[j]) == 2:
            found_match = False
            
            if answer_words[j] not in original_words[i:i+3] or answer_words[j] in original_words[i:i+3]: # replace i+3 with . value of current line // double words
                sh = []
                for k in range(i, min(i + 3, len(original_words))):
                    if helper(original_words[k], answer_words[j]) in [-1, 0, 1]:
                        found_match = True
                        sh = original_words[i:k]
                        for word in sh:
                            mistakes['missing'].append(word)
                        i = k
                        break
                    k += 1


            if not found_match and original_words[i] not in answer_words[j:j+3] or original_words[i] in answer_words[j:j+3]:
          
                for h in range(j, min(j + 3, len(answer_words))):
                    if helper(original_words[i], answer_words[h]) in [-1, 0, 1]:
                        found_match = True
                        li = answer_words[j:h]
                        for wor in li:
                            mistakes['extra'].append(wor)
                        
                        j = h
                        break
                    h += 1
            
            if not found_match:              
                for k in range(j, len(answer_words)):
                    if(helper(original_words[i], answer_words[k]) in [-1, 0, 1]):
                        found_match = True
                        ex = answer_words[j:k]
                        curr_index = j
                        for e in ex:
                            mistakes['extra'].append(e)
                  
                            curr_index += 1
                        j = k 
                        break
                    k=+1
                if not found_match:
                    for k in range(i, len(original_words)):
                        if(helper(original_words[k], answer_words[j]) in [-1, 0, 1]):
                            found_match = True
                            missW = original_words[i:k]

                            for m in missW:
                                mistakes['missing'].append(m)

             

                            i = k
                            break
                        k += 1
                
                if not found_match:
                    mistakes['extra'].append(answer_words[j])
 
                    mistakes['missing'].append(original_words[i])
                    # mistakes['missing_indices'].append(i)  

                    i += 1
                    j += 1
              

    if i < len(original_words):
        missedWords = original_words[i:]
        for w in missedWords:
            mistakes['missing'].append(w)



    if j < len(answer_words):
        extraWords = answer_words[j:]
        curr_index = j
        for w in extraWords:
            mistakes['extra'].append(w)

            curr_index += 1

    return mistakes

app = Flask(__name__)
CORS(app)

@app.route('/compare-text', methods=['POST'])
def compare_text():
    data = request.get_json()

    original = data.get('original')
    answer = data.get('answer')

    if not original or not answer:
        return jsonify({'error': 'Missing text inputs'}), 400

    result = count_mistakes(original, answer)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)