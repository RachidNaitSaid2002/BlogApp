from unittest.mock import patch, MagicMock
from Utils.Get_resum import Get_Resum
from Utils.Get_ClassName import GetClassnames


@patch("Utils.Get_ClassName.requests.post")
def test_GetClassnames(mock_post):
    mock_response = MagicMock()
    mock_response.json.return_value = [
        {"label": "technical", "score": 0.95}
    ]
    mock_post.return_value = mock_response
    res = GetClassnames("How do I update my software?")
    assert res == "technical"


@patch("Utils.Get_resum.genai.client.Models.generate_content")
def test_gemini(mock_generate):
    summary = "Hello World"
    classe = "Class"
    mode = "positive"

    mock_generate.return_value.text = """
    {
        "summary": "Hello World",
        "classe": "Class",
        "mode": "positive"
    }
    """
    res = Get_Resum("Hello World", 1, 0.8)
    assert res[0] == summary
    assert res[1] == classe
    assert res[2] == mode