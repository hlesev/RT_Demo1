{
    "targets": [
        {
            "target_name": "smallpt",
            "sources": [ "smallpt.cpp" ],
            "include_dirs": [
                "<!(node -e \"require('nan')\")"
            ]
        }
    ]
}